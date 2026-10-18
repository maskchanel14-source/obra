#!/usr/bin/env node
/**
 * Push the bundled preview catalog and its SEO keyword map to Supabase REST.
 * Requires SUPABASE_URL and SUPABASE_SERVICE_KEY in the process environment
 * or growth-site/.env. The service key is used here only and is never bundled.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DATA = path.join(ROOT, 'data');

function readDotEnv() {
  const file = path.join(ROOT, '.env');
  if (!fs.existsSync(file)) return {};
  const parsed = {};
  for (const line of fs.readFileSync(file, 'utf8').split(/\r?\n/)) {
    const match = line.match(/^\s*(?:export\s+)?([A-Z0-9_]+)\s*=\s*(.*)\s*$/i);
    if (!match || match[1].startsWith('#')) continue;
    let value = match[2].trim();
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) value = value.slice(1, -1);
    parsed[match[1]] = value;
  }
  return parsed;
}
const local = readDotEnv();
const url = (process.env.SUPABASE_URL || local.SUPABASE_URL || '').replace(/\/+$/, '');
const key = process.env.SUPABASE_SERVICE_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY || local.SUPABASE_SERVICE_KEY || local.SUPABASE_SERVICE_ROLE_KEY || '';
if (!url || !key || !url.startsWith('https://') || /YOUR_PROJECT|YOUR_SERVICE_ROLE_KEY/i.test(url + ' ' + key)) {
  console.error('Supabase sync is not configured. Set a real HTTPS SUPABASE_URL and SUPABASE_SERVICE_KEY in growth-site/.env or your environment.');
  console.error('Never expose the service key in browser config or commit it to Git.');
  process.exit(1);
}

const categories = JSON.parse(fs.readFileSync(path.join(DATA, 'categories.json'), 'utf8'));
const products = fs.readdirSync(DATA).filter((name) => /^products-.*\.json$/.test(name)).sort().flatMap((name) => JSON.parse(fs.readFileSync(path.join(DATA, name), 'utf8')));
const guides = JSON.parse(fs.readFileSync(path.join(DATA, 'guides.json'), 'utf8'));
const categoryRows = categories.map((category, index) => ({
  slug: category.slug,
  name: category.name,
  tagline: category.tagline,
  description: category.description,
  accent: category.accent,
  sort_order: category.sortOrder ?? index
}));
const productRows = products.map((product) => ({
  id: product.id,
  slug: product.slug,
  name: product.name,
  tagline: product.tagline,
  description: product.description,
  category_slug: product.category,
  price: product.price,
  formats: product.formats || [],
  keywords: product.keywords || [],
  file_size: product.fileSize || null,
  tags: product.tags || [],
  features: product.features || [],
  includes: product.includes || [],
  faqs: product.faqs || [],
  accent: product.accent || null,
  license_tiers: ['personal', 'extended'],
  mock: product.mock || 'copy',
  seo_title: `${product.name} — Preview listing`,
  seo_description: `${product.tagline}. Illustrative product concept from the ${categoryRows.find((category) => category.slug === product.category)?.name || 'digital products'} preview collection.`
}));
const keywordRows = [];
for (const product of products) {
  for (const keyword of product.keywords || []) keywordRows.push({ page_path: `/products/${product.slug}`, keyword, intent: 'transactional' });
}
for (const guide of guides) {
  for (const keyword of guide.keywords || []) keywordRows.push({ page_path: `/guides/${guide.slug}`, keyword, intent: 'informational' });
}

async function upsert(table, rows, conflict) {
  if (!rows.length) return;
  const endpoint = `${url}/rest/v1/${table}?on_conflict=${encodeURIComponent(conflict)}`;
  const res = await fetch(endpoint, {
    method: 'POST',
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      'Content-Type': 'application/json',
      Prefer: 'resolution=merge-duplicates,return=minimal'
    },
    body: JSON.stringify(rows)
  });
  if (!res.ok) {
    const detail = await res.text();
    throw new Error(`Supabase ${table} upsert failed (${res.status}): ${detail.slice(0, 600)}`);
  }
  console.log(`Upserted ${rows.length} ${table} row(s)`);
}

try {
  await upsert('categories', categoryRows, 'slug');
  await upsert('products', productRows, 'id');
  await upsert('seo_keywords', keywordRows, 'page_path,keyword');
  const status = await fetch(`${url}/rest/v1/sync_status`, {
    method: 'POST',
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      'Content-Type': 'application/json',
      Prefer: 'return=minimal'
    },
    body: JSON.stringify({ job: 'catalog-sync', records: categoryRows.length + productRows.length + keywordRows.length })
  });
  if (!status.ok) console.warn(`Could not write sync_status (${status.status}); catalog sync itself succeeded.`);
  console.log(`Catalog sync complete: ${categoryRows.length} collections, ${productRows.length} preview listings, ${keywordRows.length} SEO keyword rows.`);
} catch (error) {
  console.error(error.message);
  process.exit(1);
}
