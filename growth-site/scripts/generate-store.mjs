#!/usr/bin/env node
/**
 * Obra Store static page generator.
 * 100 indexable HTML routes: 1 home + 10 collections + 75 product previews
 * + 8 editorial guides + 6 utility pages. No runtime dependencies.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, '..');

function loadDotEnv() {
  const envPath = path.join(ROOT, '.env');
  if (!fs.existsSync(envPath)) return;
  for (const line of fs.readFileSync(envPath, 'utf8').split(/\r?\n/)) {
    const match = line.match(/^\s*(?:export\s+)?([A-Z0-9_]+)\s*=\s*(.*)\s*$/i);
    if (!match || Object.prototype.hasOwnProperty.call(process.env, match[1])) continue;
    let value = match[2].trim();
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) value = value.slice(1, -1);
    process.env[match[1]] = value;
  }
}
loadDotEnv();

const DATA_DIR = path.join(ROOT, 'data');
const SRC_DIR = path.join(ROOT, 'src');
const OUT_DIR = path.join(ROOT, 'dist');
const STORE_NAME = process.env.STORE_NAME || 'Obra Market';
const isPlaceholder = (value) => !value || /YOUR_PROJECT|YOUR_ANON_KEY|YOUR_SERVICE_ROLE_KEY|your-real-domain|you@example\.com/i.test(value);
const rawSupabaseUrl = process.env.SUPABASE_URL || '';
const rawSupabaseAnonKey = process.env.SUPABASE_ANON_KEY || '';
const SUPABASE_URL = isPlaceholder(rawSupabaseUrl) ? '' : rawSupabaseUrl;
const SUPABASE_ANON_KEY = isPlaceholder(rawSupabaseAnonKey) ? '' : rawSupabaseAnonKey;
const rawSupportEmail = process.env.STORE_SUPPORT_EMAIL || '';
const SUPPORT_EMAIL = isPlaceholder(rawSupportEmail) ? '' : rawSupportEmail;
const configuredSiteUrl = isPlaceholder(process.env.SITE_URL) ? '' : process.env.SITE_URL;
const SITE_URL = normalizeBaseUrl(
  configuredSiteUrl ||
  (process.env.VERCEL_ENV === 'production' && process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : '') ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : '') ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : '') ||
  'https://balcao-guias.vercel.app'
);
const BUILT_AT = new Date().toISOString().slice(0, 10);

function normalizeBaseUrl(value) {
  return String(value).replace(/\/+$/, '');
}

function readJson(file) {
  return JSON.parse(fs.readFileSync(path.join(DATA_DIR, file), 'utf8'));
}

const categories = readJson('categories.json');
const guides = readJson('guides.json');
const productFiles = fs.readdirSync(DATA_DIR)
  .filter((file) => /^products-.*\.json$/.test(file))
  .sort((a, b) => a.localeCompare(b));
const products = productFiles.flatMap(readJson);
const categoryBySlug = new Map(categories.map((category) => [category.slug, category]));

for (const product of products) {
  const category = categoryBySlug.get(product.category);
  if (!category) throw new Error(`Unknown category "${product.category}" on ${product.slug}`);
  product.categoryName = category.name;
  product.accent = product.accent || category.accent;
  product.url = `/products/${product.slug}`;
}
for (const category of categories) {
  category.url = `/categories/${category.slug}`;
  category.products = products.filter((product) => product.category === category.slug);
}
for (const guide of guides) {
  guide.url = `/guides/${guide.slug}`;
}

function assertUnique(values, label) {
  const seen = new Set();
  for (const value of values) {
    if (seen.has(value)) throw new Error(`Duplicate ${label}: ${value}`);
    seen.add(value);
  }
}
assertUnique(categories.map((item) => item.slug), 'category slug');
assertUnique(products.map((item) => item.slug), 'product slug');
assertUnique(guides.map((item) => item.slug), 'guide slug');

const utilityPages = [
  { slug: 'about', title: 'About Obra Market', description: 'What this preview storefront is, how its catalog is organized, and what is not live yet.', type: 'utility' },
  { slug: 'contact', title: 'Contact', description: 'Contact information and preview-mode support details for Obra Market.', type: 'utility' },
  { slug: 'faq', title: 'Frequently Asked Questions', description: 'Answers about the product catalog, licenses, checkout, and this preview storefront.', type: 'utility' },
  { slug: 'license', title: 'License Guide', description: 'A plain-language guide to the sample license tiers shown in this preview catalog.', type: 'utility' },
  { slug: 'privacy', title: 'Privacy Notice', description: 'How this preview storefront handles preferences, analytics consent, and demo forms.', type: 'utility' },
  { slug: 'terms', title: 'Terms of Use', description: 'Terms that apply while browsing this non-transactional storefront preview.', type: 'utility' }
];

const pageManifest = [];
const allRoutes = new Set();
function register(route, type, title) {
  if (allRoutes.has(route)) throw new Error(`Duplicate route: ${route}`);
  allRoutes.add(route);
  pageManifest.push({ route, type, title });
}

function esc(value) {
  return String(value ?? '').replace(/[&<>"']/g, (char) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  })[char]);
}
function attr(value) { return esc(value).replace(/\n/g, ' '); }
function jsJson(value) {
  return JSON.stringify(value)
    .replace(/</g, '\\u003c')
    .replace(/>/g, '\\u003e')
    .replace(/&/g, '\\u0026')
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029');
}
function price(value) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(value);
}
function writePage(filePath, html) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, html, 'utf8');
}

const ICONS = {
  search: '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="10.8" cy="10.8" r="6.8" stroke="currentColor" stroke-width="1.7"/><path d="m16 16 4.2 4.2" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>',
  cart: '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M3 4h2l2.1 10.3a2 2 0 0 0 2 1.6h8.4a2 2 0 0 0 1.9-1.4L21 8H6" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/><circle cx="10" cy="20" r="1.2" fill="currentColor"/><circle cx="18" cy="20" r="1.2" fill="currentColor"/></svg>',
  sun: '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="4" stroke="currentColor" stroke-width="1.7"/><path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>',
  moon: '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M20.5 15.5A8.5 8.5 0 0 1 8.5 3.5 8.5 8.5 0 1 0 20.5 15.5Z" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/></svg>',
  menu: '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>',
  close: '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>',
  arrow: '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12h14m-6-6 6 6-6 6" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  check: '<svg viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="m4 10 4 4 8-8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  terminal: '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="3" y="4" width="18" height="16" rx="3" stroke="currentColor" stroke-width="1.6"/><path d="m7 9 3 3-3 3m6 0h4" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  layers: '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m12 3 9 5-9 5-9-5 9-5Z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><path d="m4 12 8 4.5 8-4.5M4 16l8 5 8-5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  code: '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m8 6-6 6 6 6m8-12 6 6-6 6m-2-15-4 18" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  palette: '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 3a9 9 0 1 0 0 18h1.2a2 2 0 0 0 1.4-3.4 1.8 1.8 0 0 1 1.3-3.1H18a3 3 0 0 0 3-3c0-4.7-4-8.5-9-8.5Z" stroke="currentColor" stroke-width="1.6"/><circle cx="7.5" cy="11" r="1" fill="currentColor"/><circle cx="10" cy="7.5" r="1" fill="currentColor"/><circle cx="15" cy="8" r="1" fill="currentColor"/></svg>',
  bolt: '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m13 2-9 12h7l-1 8 10-13h-7l1-7Z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/></svg>',
  image: '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="3" y="4" width="18" height="16" rx="3" stroke="currentColor" stroke-width="1.6"/><circle cx="8.5" cy="9" r="1.5" stroke="currentColor" stroke-width="1.5"/><path d="m4 17 5-5 3 3 3-4 5 6" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  grid: '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="3" y="3" width="8" height="8" rx="2" stroke="currentColor" stroke-width="1.6"/><rect x="13" y="3" width="8" height="8" rx="2" stroke="currentColor" stroke-width="1.6"/><rect x="3" y="13" width="8" height="8" rx="2" stroke="currentColor" stroke-width="1.6"/><rect x="13" y="13" width="8" height="8" rx="2" stroke="currentColor" stroke-width="1.6"/></svg>',
  layout: '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="3" y="4" width="18" height="16" rx="3" stroke="currentColor" stroke-width="1.6"/><path d="M3 9h18M9 9v11" stroke="currentColor" stroke-width="1.6"/></svg>',
  plug: '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M9 3v5m6-5v5M7 8h10v3a5 5 0 0 1-5 5v5m-5-13v3a5 5 0 0 0 5 5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  spark: '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m12 2 1.8 7.1L21 12l-7.2 2.9L12 22l-1.8-7.1L3 12l7.2-2.9L12 2Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></svg>',
  link: '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M10 13.5a5 5 0 0 0 7.1 0l2.1-2.1a5 5 0 0 0-7.1-7.1L10.9 5.5m3.1 5a5 5 0 0 0-7.1 0l-2.1 2.1a5 5 0 0 0 7.1 7.1l1.2-1.2" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>'
};
const icon = (name) => ICONS[name] || ICONS.spark;

function safeCategoryName(slug) {
  return categoryBySlug.get(slug)?.name || 'Digital products';
}

function artwork(product, mode = 'card') {
  const c = product.accent || '#7928ca';
  const c2 = '#0070f3';
  const wide = mode === 'wide';
  const width = wide ? 860 : 520;
  const height = wide ? 520 : 280;
  const id = `art-${product.id.replace(/[^a-z0-9-]/gi, '')}-${mode}`;
  let scene = '';
  switch (product.mock) {
    case 'terminal':
    case 'code':
      scene = `<rect x="${width * .09}" y="${height * .13}" width="${width * .82}" height="${height * .74}" rx="18" fill="#0a0d13" stroke="#ffffff" stroke-opacity=".14"/><circle cx="${width * .14}" cy="${height * .21}" r="4" fill="#ff5f57"/><circle cx="${width * .16}" cy="${height * .21}" r="4" fill="#febc2e"/><circle cx="${width * .18}" cy="${height * .21}" r="4" fill="#28c840"/><rect x="${width * .13}" y="${height * .31}" width="${width * .24}" height="7" rx="3.5" fill="${c}"/><rect x="${width * .13}" y="${height * .39}" width="${width * .48}" height="5" rx="2.5" fill="#94a3b8" opacity=".75"/><rect x="${width * .13}" y="${height * .47}" width="${width * .35}" height="5" rx="2.5" fill="#34d399" opacity=".82"/><rect x="${width * .13}" y="${height * .55}" width="${width * .57}" height="5" rx="2.5" fill="#94a3b8" opacity=".48"/><rect x="${width * .13}" y="${height * .63}" width="${width * .3}" height="5" rx="2.5" fill="#c084fc" opacity=".8"/><rect x="${width * .13}" y="${height * .71}" width="${width * .52}" height="5" rx="2.5" fill="#94a3b8" opacity=".58"/>`;
      break;
    case 'chart':
      scene = `<rect x="${width * .12}" y="${height * .16}" width="${width * .76}" height="${height * .68}" rx="16" fill="#fff" fill-opacity=".05" stroke="#fff" stroke-opacity=".12"/><path d="M${width * .2} ${height * .7}H${width * .81}M${width * .2} ${height * .57}H${width * .81}M${width * .2} ${height * .44}H${width * .81}M${width * .2} ${height * .31}H${width * .81}" stroke="#fff" stroke-opacity=".09"/><rect x="${width * .25}" y="${height * .53}" width="${width * .07}" height="${height * .17}" rx="5" fill="${c}"/><rect x="${width * .38}" y="${height * .42}" width="${width * .07}" height="${height * .28}" rx="5" fill="${c2}"/><rect x="${width * .51}" y="${height * .32}" width="${width * .07}" height="${height * .38}" rx="5" fill="${c}"/><rect x="${width * .64}" y="${height * .25}" width="${width * .07}" height="${height * .45}" rx="5" fill="#c084fc"/><path d="M${width * .24} ${height * .44}c40-36 80 18 120-14 42-34 70 12 118-34" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" opacity=".8"/>`;
      break;
    case 'notion':
      scene = `<rect x="${width * .12}" y="${height * .14}" width="${width * .76}" height="${height * .72}" rx="18" fill="#fff" fill-opacity=".96"/><rect x="${width * .17}" y="${height * .21}" width="${width * .25}" height="${height * .12}" rx="7" fill="${c}" opacity=".88"/><rect x="${width * .46}" y="${height * .21}" width="${width * .34}" height="${height * .12}" rx="7" fill="#edf0f5"/><rect x="${width * .17}" y="${height * .39}" width="${width * .29}" height="${height * .37}" rx="7" fill="#f0f2f6"/><rect x="${width * .50}" y="${height * .39}" width="${width * .3}" height="${height * .12}" rx="7" fill="#e7eaf0"/><rect x="${width * .50}" y="${height * .55}" width="${width * .3}" height="${height * .21}" rx="7" fill="${c2}" opacity=".35"/>`;
      break;
    case 'flow':
      scene = `<path d="M${width * .22} ${height * .5}H${width * .78}M${width * .5} ${height * .27}V${height * .73}" stroke="#fff" stroke-opacity=".2" stroke-width="4" stroke-dasharray="8 8"/><rect x="${width * .1}" y="${height * .34}" width="${width * .23}" height="${height * .32}" rx="12" fill="${c}"/><rect x="${width * .39}" y="${height * .12}" width="${width * .23}" height="${height * .32}" rx="12" fill="#fff" fill-opacity=".1" stroke="#fff" stroke-opacity=".22"/><rect x="${width * .68}" y="${height * .34}" width="${width * .23}" height="${height * .32}" rx="12" fill="${c2}"/><circle cx="${width * .215}" cy="${height * .5}" r="13" fill="#fff" fill-opacity=".82"/><circle cx="${width * .505}" cy="${height * .28}" r="13" fill="#fff" fill-opacity=".82"/><circle cx="${width * .795}" cy="${height * .5}" r="13" fill="#fff" fill-opacity=".82"/>`;
      break;
    case 'mail':
      scene = `<rect x="${width * .15}" y="${height * .17}" width="${width * .7}" height="${height * .66}" rx="16" fill="#fff" fill-opacity=".96"/><rect x="${width * .21}" y="${height * .27}" width="${width * .29}" height="8" rx="4" fill="${c}"/><rect x="${width * .21}" y="${height * .38}" width="${width * .56}" height="5" rx="3" fill="#9ca3af"/><rect x="${width * .21}" y="${height * .49}" width="${width * .49}" height="5" rx="3" fill="#cbd5e1"/><rect x="${width * .21}" y="${height * .6}" width="${width * .38}" height="5" rx="3" fill="#cbd5e1"/><rect x="${width * .21}" y="${height * .7}" width="${width * .2}" height="${height * .07}" rx="6" fill="${c2}"/>`;
      break;
    case 'image':
    case 'gradient':
    case 'render':
    case 'illustration':
    case 'brand':
      scene = `<circle cx="${width * .35}" cy="${height * .49}" r="${height * .24}" fill="url(#${id}-a)" opacity=".92"/><circle cx="${width * .57}" cy="${height * .46}" r="${height * .28}" fill="url(#${id}-b)" opacity=".82"/><path d="M${width * .13} ${height * .77}c${width * .17}-${height * .34} ${width * .29}-${height * .13} ${width * .42}-${height * .38}s${width * .24}-${height * .14} ${width * .32}-${height * .03}" fill="none" stroke="#fff" stroke-width="2" stroke-opacity=".45"/><circle cx="${width * .72}" cy="${height * .29}" r="5" fill="#fff" opacity=".9"/><circle cx="${width * .2}" cy="${height * .3}" r="3" fill="#fff" opacity=".6"/>`;
      break;
    case 'icons':
      scene = Array.from({ length: 8 }, (_, i) => {
        const x = width * (.22 + (i % 4) * .19);
        const y = height * (.31 + Math.floor(i / 4) * .34);
        return `<rect x="${x - 19}" y="${y - 19}" width="38" height="38" rx="11" fill="#fff" fill-opacity=".08" stroke="#fff" stroke-opacity=".16"/><path d="M${x - 8} ${y}h16m-8-8v16" stroke="${i % 2 ? c : '#fff'}" stroke-width="2.5" stroke-linecap="round"/>`;
      }).join('');
      break;
    case 'doc':
      scene = `<rect x="${width * .28}" y="${height * .12}" width="${width * .44}" height="${height * .76}" rx="13" fill="#fff" fill-opacity=".96"/><rect x="${width * .35}" y="${height * .25}" width="${width * .25}" height="8" rx="4" fill="${c}"/><rect x="${width * .35}" y="${height * .37}" width="${width * .3}" height="4" rx="2" fill="#aab0bc"/><rect x="${width * .35}" y="${height * .45}" width="${width * .29}" height="4" rx="2" fill="#c2c7d0"/><rect x="${width * .35}" y="${height * .53}" width="${width * .21}" height="4" rx="2" fill="#c2c7d0"/><rect x="${width * .35}" y="${height * .65}" width="${width * .27}" height="${height * .11}" rx="6" fill="${c}" opacity=".22"/>`;
      break;
    case 'page':
      scene = `<rect x="${width * .23}" y="${height * .1}" width="${width * .54}" height="${height * .8}" rx="12" fill="#fff" fill-opacity=".96"/><rect x="${width * .29}" y="${height * .2}" width="${width * .42}" height="${height * .15}" rx="7" fill="${c}" opacity=".85"/><rect x="${width * .31}" y="${height * .44}" width="${width * .38}" height="6" rx="3" fill="#9ca3af"/><rect x="${width * .34}" y="${height * .55}" width="${width * .32}" height="6" rx="3" fill="#cbd5e1"/><rect x="${width * .39}" y="${height * .68}" width="${width * .22}" height="${height * .09}" rx="8" fill="${c2}"/>`;
      break;
    default:
      scene = `<rect x="${width * .18}" y="${height * .19}" width="${width * .64}" height="${height * .62}" rx="20" fill="url(#${id}-a)" opacity=".8"/><circle cx="${width * .5}" cy="${height * .5}" r="${height * .17}" fill="#fff" fill-opacity=".18"/>`;
  }
  return `<svg viewBox="0 0 ${width} ${height}" role="img" aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="${id}-bg" x1="0" y1="0" x2="1" y2="1"><stop stop-color="${c}" stop-opacity=".26"/><stop offset="1" stop-color="${c2}" stop-opacity=".12"/></linearGradient><linearGradient id="${id}-a" x1="0" y1="0" x2="1" y2="1"><stop stop-color="${c}"/><stop offset="1" stop-color="#ff0080"/></linearGradient><linearGradient id="${id}-b" x1="0" y1="0" x2="1" y2="1"><stop stop-color="${c2}"/><stop offset="1" stop-color="#7928ca"/></linearGradient><radialGradient id="${id}-glow"><stop stop-color="${c}" stop-opacity=".42"/><stop offset="1" stop-color="${c}" stop-opacity="0"/></radialGradient></defs><rect width="${width}" height="${height}" rx="${wide ? 20 : 14}" fill="url(#${id}-bg)"/><circle cx="${width * .1}" cy="${height * .15}" r="${height * .62}" fill="url(#${id}-glow)"/><circle cx="${width * .92}" cy="${height * .9}" r="${height * .65}" fill="url(#${id}-glow)" opacity=".6"/>${scene}</svg>`;
}

function productCard(product) {
  return `<article class="product-card card card-hover" style="--accent:${attr(product.accent)}">
    <a class="product-thumb" href="${attr(product.url)}" tabindex="-1" aria-hidden="true">${artwork(product)}</a>
    <div class="product-body">
      <div class="product-cat">${esc(product.categoryName)}</div>
      <h3 class="product-name"><a href="${attr(product.url)}">${esc(product.name)}</a></h3>
      <p class="product-tag">${esc(product.tagline)}</p>
      <div class="product-meta">
        <span class="badge">Preview listing</span>
        <div class="price-row"><span class="compare-at">sample</span><span class="price">${price(product.price)}</span></div>
      </div>
    </div>
  </article>`;
}

function categoryCard(category) {
  return `<a class="cat-tile card card-hover" style="--tile-accent:${attr(category.accent)}" href="${attr(category.url)}">
    <div class="fb-icon">${icon(category.icon)}</div>
    <h3>${esc(category.name)}</h3>
    <p>${esc(category.tagline)}</p>
    <span class="count">${category.products.length} preview listings · Explore ${icon('arrow')}</span>
  </a>`;
}

function guideCard(guide, index) {
  const tags = ['Field guide', 'Buyer’s guide', 'Playbook', 'Learn'];
  return `<article class="guide-card card card-hover reveal">
    <div class="guide-card-top"><span class="badge">${tags[index % tags.length]}</span><span class="guide-index">0${index + 1}</span></div>
    <h3><a href="${attr(guide.url)}">${esc(guide.title)}</a></h3>
    <p>${esc(guide.description)}</p>
    <a class="text-link" href="${attr(guide.url)}">Read the guide ${icon('arrow')}</a>
  </article>`;
}

function previewNotice() {
  return `<div class="preview-banner" role="note"><span class="badge badge-preview">PREVIEW</span><span>Sample catalog only — listings, prices and checkout are not live. <a href="/terms">See what this preview means</a>.</span></div>`;
}

function header() {
  return `<a class="skip-link" href="#main">Skip to content</a>
    <header class="site-header">
      <div class="container nav">
        <a class="brand" href="/" aria-label="${attr(STORE_NAME)} home"><span class="brand-mark">O</span><span>obra<span class="brand-period">.</span></span></a>
        <nav class="nav-links" aria-label="Main navigation">
          <a href="/#products" data-i18n="nav.products">Products</a>
          <a href="/#categories" data-i18n="nav.categories">Categories</a>
          <a href="/#guides" data-i18n="nav.guides">Guides</a>
          <a href="/about" data-i18n="nav.about">About</a>
        </nav>
        <div class="nav-actions">
          <button class="icon-btn" type="button" data-search-open aria-label="Search catalog" title="Search (⌘K)">${icon('search')}</button>
          <button class="icon-btn theme-toggle" id="theme-toggle" type="button" aria-label="Toggle color theme" title="Toggle theme">${icon('moon')}</button>
          <label class="visually-hidden" for="lang-select" data-i18n="lang.label">Language</label>
          <select class="lang-select" id="lang-select" aria-label="Language">
            <option value="en">EN</option><option value="id">ID</option><option value="pt-BR">PT-BR</option>
          </select>
          <button class="icon-btn cart-btn" id="cart-open" type="button" aria-label="Open demo cart" aria-expanded="false" aria-controls="cart-drawer">${icon('cart')}<span class="cart-count" id="cart-count" style="display:none">0</span></button>
          <button class="icon-btn nav-toggle" id="nav-toggle" type="button" aria-expanded="false" aria-controls="mobile-menu" aria-label="Open menu">${icon('menu')}</button>
        </div>
      </div>
      <nav class="mobile-menu" id="mobile-menu" aria-label="Mobile navigation">
        <a href="/#products" data-i18n="nav.products">Products</a><a href="/#categories" data-i18n="nav.categories">Categories</a><a href="/#guides" data-i18n="nav.guides">Guides</a><a href="/about" data-i18n="nav.about">About</a><a href="/faq" data-i18n="nav.faq">FAQ</a>
      </nav>
    </header>`;
}

function footer() {
  const catLinks = categories.slice(0, 5).map((category) => `<a href="${attr(category.url)}">${esc(category.name)}</a>`).join('');
  return `<footer class="site-footer">
    <div class="container footer-grid">
      <div class="footer-brand-col"><a class="brand" href="/"><span class="brand-mark">O</span><span>obra<span class="brand-period">.</span></span></a><p class="footer-tagline">A storefront prototype for useful digital tools, templates, and creative systems.</p><p class="footer-preview-note">Preview catalog · No payment or downloads yet.</p></div>
      <div><h4 data-i18n="footer.products">Products</h4>${catLinks}<a href="/#products">Browse catalog</a></div>
      <div><h4 data-i18n="footer.resources">Resources</h4><a href="/#guides">Field guides</a><a href="/faq">FAQ</a><a href="/license">License guide</a></div>
      <div><h4 data-i18n="footer.company">Company</h4><a href="/about">About</a><a href="/contact">Contact</a><h4 class="footer-legal-title" data-i18n="footer.legal">Legal</h4><a href="/privacy">Privacy</a><a href="/terms">Terms</a></div>
    </div>
    <div class="container footer-bottom"><span>© ${new Date().getFullYear()} ${esc(STORE_NAME)}. <span data-i18n="footer.rights">All rights reserved.</span></span><a href="/privacy">Privacy</a><button class="privacy-settings-link" type="button" data-privacy-open>Privacy choices</button></div>
  </footer>`;
}

function overlays() {
  return `<div class="search-overlay" id="search-overlay" role="dialog" aria-modal="true" aria-label="Search catalog">
      <div class="search-panel"><div class="search-input-row">${icon('search')}<input id="search-input" type="search" autocomplete="off" placeholder="Search 75 preview listings…" data-i18n="search.placeholder" aria-label="Search product catalog"><kbd>ESC</kbd></div><div class="search-results" id="search-results"></div></div>
    </div>
    <div class="drawer-backdrop" id="drawer-backdrop"></div>
    <aside class="cart-drawer" id="cart-drawer" role="dialog" aria-modal="true" aria-labelledby="cart-title" aria-hidden="true" inert>
      <div class="cart-head"><h2 id="cart-title" data-i18n="cart.title">Your cart</h2><button class="icon-btn" id="cart-close" type="button" aria-label="Close cart">${icon('close')}</button></div>
      <div class="cart-items" id="cart-items"></div>
      <div class="cart-foot"><div class="cart-total"><span data-i18n="cart.total">Total</span><span id="cart-total">$0</span></div><p class="cart-disclaimer">Demo cart only. Checkout and delivery are not enabled.</p><button class="btn btn-primary btn-block" id="cart-checkout" type="button" disabled data-i18n="cta.checkout">Checkout disabled</button><button class="btn btn-ghost btn-block" id="cart-clear" type="button" data-i18n="cart.clear">Clear</button></div>
    </aside>
    <div class="toast-zone" aria-live="polite" aria-atomic="true"></div>
    <div class="consent-banner" id="consent-banner" hidden role="region" aria-label="Privacy choices">
      <div><strong>Optional analytics</strong><p>If you configure Supabase analytics, this preview can record anonymous page paths only after you opt in. No analytics are active by default.</p></div>
      <div class="consent-actions"><button class="btn btn-secondary btn-sm" id="consent-decline" type="button">Decline</button><button class="btn btn-primary btn-sm" id="consent-accept" type="button">Allow analytics</button></div>
    </div>`;
}

function scripts() {
  const config = {
    supabase: SUPABASE_URL && SUPABASE_ANON_KEY ? { url: SUPABASE_URL, anonKey: SUPABASE_ANON_KEY } : null,
    siteName: STORE_NAME,
    preview: true
  };
  const catalog = products.map((product) => ({
    id: product.id, slug: product.slug, name: product.name, tagline: product.tagline,
    category: product.category, categoryName: product.categoryName, url: product.url,
    price: product.price, tags: product.tags || [], accent: product.accent, mock: product.mock
  }));
  return `<script>window.__STORE_CONFIG__=${jsJson(config)};</script>
    <script src="/assets/catalog-data.js" defer></script>
    <script src="/assets/supabase.js" defer></script>
    <script src="/assets/catalog-loader.js" defer></script>
    <script src="/assets/i18n.js" defer></script>
    <script src="/assets/app.js" defer></script>`;
}

function shell({ title, description, route, body, keywords = [], type = 'website', productSlug = '', structuredData = null }) {
  const canonical = `${SITE_URL}${route === '/' ? '/' : route}`;
  const ld = structuredData ? `<script type="application/ld+json">${jsJson(structuredData)}</script>` : '';
  const kwMeta = keywords.length ? `<meta name="keywords" content="${attr(keywords.join(', '))}">` : '';
  const support = SUPPORT_EMAIL ? `<meta name="support-email" content="${attr(SUPPORT_EMAIL)}">` : '';
  return `<!doctype html>
<html lang="en" data-theme="dark">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="theme-color" content="#050507">
  <meta name="description" content="${attr(description)}">
  ${kwMeta}
  ${support}
  <meta name="obra-page"${productSlug ? ` data-product="${attr(productSlug)}"` : ''} content="${attr(route)}">
  <meta property="og:type" content="${attr(type)}">
  <meta property="og:site_name" content="${attr(STORE_NAME)}">
  <meta property="og:title" content="${attr(title)}">
  <meta property="og:description" content="${attr(description)}">
  <meta property="og:url" content="${attr(canonical)}">
  <meta name="twitter:card" content="summary">
  <meta name="twitter:title" content="${attr(title)}">
  <meta name="twitter:description" content="${attr(description)}">
  <link rel="canonical" href="${attr(canonical)}">
  <link rel="icon" href="/assets/favicon.svg" type="image/svg+xml">
  <link rel="stylesheet" href="/assets/design-system.css">
  <link rel="stylesheet" href="/assets/store-overrides.css">
  <title>${esc(title)} · ${esc(STORE_NAME)}</title>
  ${ld}
</head>
<body>
  <div class="bg-orbs" aria-hidden="true"></div><div class="bg-grid" aria-hidden="true"></div>
  ${header()}
  ${previewNotice()}
  ${body}
  ${footer()}
  ${overlays()}
  ${scripts()}
</body>
</html>`;
}

function breadcrumb(items) {
  return `<nav class="breadcrumbs" aria-label="Breadcrumbs">${items.map((item, index) => `${index ? '<span class="sep" aria-hidden="true">/</span>' : ''}${item.url ? `<a href="${attr(item.url)}">${esc(item.label)}</a>` : `<span aria-current="page">${esc(item.label)}</span>`}`).join('')}</nav>`;
}

function sectionHead(eyebrowText, heading, copy, centered = false) {
  return `<div class="section-head${centered ? ' center' : ''}"><span class="eyebrow">${esc(eyebrowText)}</span><h2>${esc(heading)}</h2>${copy ? `<p>${esc(copy)}</p>` : ''}</div>`;
}

function homePage() {
  const featured = [
    products.find((product) => product.slug === 'conversion-copy-catalyst'),
    products.find((product) => product.slug === 'deep-research-agent-skill'),
    products.find((product) => product.slug === 'founder-os'),
    products.find((product) => product.slug === 'saas-starter-stack'),
    products.find((product) => product.slug === 'product-shot-director-pack'),
    products.find((product) => product.slug === 'marketing-metrics-command'),
    products.find((product) => product.slug === 'lead-gen-autopilot'),
    products.find((product) => product.slug === 'saas-launch-canvas')
  ].filter(Boolean);
  const guideCards = guides.slice(0, 4).map(guideCard).join('');
  const faq = [
    ['Can I buy or download a product here?', 'Not yet. This is a complete storefront preview with sample listings and sample prices. Checkout, payment processing, and file delivery are intentionally disabled.'],
    ['Are the ratings, sales counts, and reviews real?', 'No customer ratings, sales totals, or testimonials are displayed. Catalog details are illustrative preview content and should be verified or replaced before a commercial launch.'],
    ['How many pages are included?', 'The build creates exactly 100 indexable pages: a home page, 10 collection pages, 75 product preview pages, 8 guides, and 6 utility pages.'],
    ['Is Supabase connected?', 'The schema and sync script are included. A Supabase project is not connected until you add your own URL and keys; the static catalog works without it.'],
    ['Can I browse in Indonesian?', 'Yes. Use the language selector to localize navigation and store controls in Indonesian or Brazilian Portuguese. Guide and product copy remains in English for this initial preview.']
  ];
  const structured = {
    '@context': 'https://schema.org', '@type': 'WebSite', name: STORE_NAME, url: `${SITE_URL}/`,
    description: 'A preview catalog of digital tools, templates, and starter kits.',
    inLanguage: ['en', 'id', 'pt-BR']
  };
  const body = `<main id="main">
    <section class="hero container">
      <div class="hero-eyebrow"><span class="dot"></span><span>Digital tools for people who make things</span></div>
      <h1>Make the next thing. <span class="grad-text">Skip the busywork.</span></h1>
      <p class="hero-sub">Explore a curated preview of prompts, agent skills, templates, and practical starter kits for modern independent work.</p>
      <div class="hero-ctas"><a class="btn btn-primary" href="#products">Explore the catalog ${icon('arrow')}</a><a class="btn btn-secondary" href="#guides">Read the field guides</a></div>
      <p class="hero-disclaimer">Preview catalog · Sample listings and prices · No checkout or downloads yet</p>
      <div class="hero-stats" aria-label="Catalog contents">
        <div class="hero-stat"><b data-count="${products.length}">${products.length}</b><span>preview listings</span></div>
        <div class="hero-stat"><b data-count="${categories.length}">${categories.length}</b><span>collections</span></div>
        <div class="hero-stat"><b data-count="${guides.length}">${guides.length}</b><span>practical guides</span></div>
      </div>
    </section>

    <section class="section container" id="categories">
      ${sectionHead('Explore by format', 'Find your next useful shortcut', 'Ten focused collections. Every listing is a preview concept; use the guides to compare formats and choose what to build or buy.', true)}
      <div class="grid grid-categories">${categories.map(categoryCard).join('')}</div>
    </section>

    <section class="section container" id="products">
      <div class="section-row">${sectionHead('A few places to start', 'Tools for your next project', 'A hand-picked cross-section of the preview catalog. See the full specs and sample license notes on each listing.')}
        <button class="btn btn-secondary btn-sm" type="button" data-search-open>${icon('search')} Search all 75</button>
      </div>
      <div class="grid grid-products">${featured.map(productCard).join('')}</div>
      <div class="center-action"><a class="btn btn-ghost" href="/categories/prompt-packs">Browse all collections ${icon('arrow')}</a></div>
    </section>

    <section class="section container">
      ${sectionHead('A better starting point', 'A practical path from idea to workflow', 'Use this preview to explore product formats, then adapt the patterns to your actual tools and needs.', true)}
      <div class="grid grid-3">
        <article class="feature-block card reveal"><div class="fb-icon">${icon('search')}</div><h3>1. Find a useful format</h3><p>Browse by task — writing, research, design, operations, or development — rather than by trend alone.</p></article>
        <article class="feature-block card reveal"><div class="fb-icon">${icon('spark')}</div><h3>2. Check the trade-offs</h3><p>Read what is included, which tools a concept assumes, and where human review still matters.</p></article>
        <article class="feature-block card reveal"><div class="fb-icon">${icon('check')}</div><h3>3. Make it yours</h3><p>Use the guides and templates as starting points. Verify every claim, integration, and license before a real launch.</p></article>
      </div>
    </section>

    <section class="section container" id="guides">
      <div class="section-row">${sectionHead('Learn before you choose', 'Field guides for digital work', 'Specific, practical context to help compare tools and avoid buying a format that will not fit your workflow.')}
        <span class="guide-total">${guides.length} guides</span>
      </div>
      <div class="grid guide-grid">${guideCards}</div>
    </section>

    <section class="section container" id="faq">
      ${sectionHead('Good to know', 'Preview-store questions', 'The important constraints, plainly stated.', true)}
      <div class="faq-list">${faq.map(([q, a]) => `<details class="faq"><summary>${esc(q)}</summary><div class="faq-a">${esc(a)}</div></details>`).join('')}</div>
    </section>

    <section class="section container">
      <div class="newsletter preview-cta"><span class="eyebrow">Help shape the next version</span><h2>What would make this catalog useful?</h2><p class="newsletter-copy">This storefront is a working preview, not a live shop. Explore the pages, then tell the maintainer what should be real before launch.</p><div class="hero-ctas"><a class="btn btn-primary" href="/contact">Send feedback ${icon('arrow')}</a><a class="btn btn-secondary" href="/about">About this preview</a></div></div>
    </section>
  </main>`;
  return shell({ title: `${STORE_NAME} — Digital tools for makers`, description: 'Explore a 100-page preview catalog of digital products, agent skills, Notion templates, developer starters, and practical guides.', route: '/', body, keywords: ['digital product catalog preview', 'AI prompts', 'agent skills', 'Notion templates', 'developer boilerplates'], structuredData: structured });
}

function categoryPage(category) {
  const body = `<main class="container" id="main">
    ${breadcrumb([{ label: 'Home', url: '/' }, { label: 'Collections', url: '/#categories' }, { label: category.name }])}
    <section class="page-head category-head" style="--accent:${attr(category.accent)}">
      <span class="eyebrow">Collection · ${category.products.length} preview listings</span><h1>${esc(category.name)}</h1>
      <p class="lede">${esc(category.description)}</p>
      <p class="category-preview-note">All listings and sample prices are illustrative. Checkout and downloads are disabled in this preview.</p>
    </section>
    <section class="section collection-section">
      <div class="collection-toolbar"><p>Showing <strong>${category.products.length}</strong> catalog concepts</p><button class="btn btn-secondary btn-sm" type="button" data-search-open>${icon('search')} Search catalog</button></div>
      <div class="grid grid-products">${category.products.map(productCard).join('')}</div>
    </section>
    <section class="section collection-guide card"><span class="eyebrow">Browse all</span><h2>Still exploring?</h2><p>Compare other formats across the catalog, or start with one of the practical field guides.</p><div class="hero-ctas"><a class="btn btn-primary" href="/#categories">All collections ${icon('arrow')}</a><a class="btn btn-secondary" href="/#guides">Read the guides</a></div></section>
  </main>`;
  const keywords = [category.name.toLowerCase(), ...category.products.flatMap((product) => product.keywords || [])].slice(0, 16);
  return shell({ title: `${category.name} — Preview collection`, description: category.description, route: category.url, body, keywords, type: 'website' });
}

function productPage(product) {
  const category = categoryBySlug.get(product.category);
  const related = category.products.filter((item) => item.slug !== product.slug).slice(0, 3);
  const breadcrumbs = breadcrumb([{ label: 'Home', url: '/' }, { label: category.name, url: category.url }, { label: product.name }]);
  const featureList = (items) => `<ul class="feature-list">${items.map((item) => `<li><span class="check">${icon('check')}</span><span>${esc(item)}</span></li>`).join('')}</ul>`;
  const includesList = (items) => `<ul class="pd-includes">${items.map((item) => `<li><span class="check">${icon('check')}</span><span>${esc(item)}</span></li>`).join('')}</ul>`;
  const tagChips = (product.tags || []).map((tag) => `<span class="chip chip-static">${esc(tag)}</span>`).join('');
  const faqs = (product.faqs || []).map((item) => `<details class="faq"><summary>${esc(item.q)}</summary><div class="faq-a">${esc(item.a)}</div></details>`).join('');
  const body = `<main class="container" id="main">
    ${breadcrumbs}
    <section class="pd-grid" style="--accent:${attr(product.accent)}">
      <div class="pd-visual-column">
        <div class="preview-panel"><div class="preview-bar"><i></i><i></i><i></i><span class="preview-window-label">Concept preview · ${esc(product.mock)}</span></div><div class="preview-body">${artwork(product, 'wide')}</div></div>
        <div class="pd-featured-info"><span class="eyebrow">What this concept covers</span><h2>${esc(product.name)}</h2><p>${esc(product.description)}</p></div>
      </div>
      <div class="pd-info-column">
        <span class="eyebrow">${esc(category.name)} · Preview listing</span>
        <h1 class="pd-title" data-live-field="name">${esc(product.name)}</h1>
        <p class="pd-tagline" data-live-field="tagline">${esc(product.tagline)}</p>
        <div class="pd-meta"><span>Illustrative listing</span><span aria-hidden="true">·</span><span>${(product.formats || []).map(esc).join(' · ')}</span></div>
        <div class="pd-buy card">
          <div class="pd-price-row"><span class="pd-price" id="pd-price" data-base="${Number(product.price)}">${price(product.price)}</span><span class="badge badge-preview">sample price</span></div>
          <p class="price-note">Preview price only · USD · no charge will be made</p>
          <h2 class="license-title" data-i18n="product.license">License</h2>
          <div class="pd-license" role="group" aria-label="Sample license tier">
            <button class="license-opt active" type="button" data-mult="1" aria-pressed="true"><b data-i18n="license.personal">Personal</b><span data-i18n="license.personalDesc">1 seat · personal projects</span></button>
            <button class="license-opt" type="button" data-mult="3" aria-pressed="false"><b data-i18n="license.extended">Extended</b><span data-i18n="license.extendedDesc">Unlimited seats · client work</span></button>
          </div>
          <button class="btn btn-primary btn-block" id="buy-btn" type="button" data-add-cart="${attr(product.slug)}" data-name="${attr(product.name)}" data-price="${Number(product.price)}" data-i18n="cta.cart">Add to demo cart</button>
          <p class="buy-note">No payment, file delivery, or customer account is active in this preview.</p>
          <div class="purchase-includes"><strong>Concept scope</strong>${includesList(product.includes || [])}</div>
        </div>
        <div class="tag-row" aria-label="Product topics">${tagChips}</div>
      </div>
    </section>

    <section class="section pd-detail-section">
      <div class="tabs" role="tablist" aria-label="Listing details">
        <button class="tab" id="tab-details" role="tab" aria-selected="true" aria-controls="panel-details" type="button" data-i18n="product.details">Details</button>
        <button class="tab" id="tab-includes" role="tab" aria-selected="false" aria-controls="panel-includes" type="button" data-i18n="product.includes">What's included</button>
        <button class="tab" id="tab-faq" role="tab" aria-selected="false" aria-controls="panel-faq" type="button" data-i18n="product.faq">FAQ</button>
      </div>
      <div class="tab-panel" id="panel-details" role="tabpanel" aria-labelledby="tab-details">
        <div class="pd-copy"><h2>About this concept</h2><p>${esc(product.description)}</p><h3>Proposed capabilities</h3>${featureList(product.features || [])}<p class="fine-print">This is illustrative catalog copy, not a verified specification. Confirm all features, formats, compatibility, and update commitments before offering a real product.</p></div>
      </div>
      <div class="tab-panel" id="panel-includes" role="tabpanel" aria-labelledby="tab-includes" hidden><div class="pd-copy"><h2>Proposed deliverables</h2>${includesList(product.includes || [])}<p class="fine-print">No downloadable files are attached to this preview listing.</p></div></div>
      <div class="tab-panel" id="panel-faq" role="tabpanel" aria-labelledby="tab-faq" hidden><div class="faq-list">${faqs || '<p class="empty-note">No FAQs yet.</p>'}</div><p class="fine-print">Answers describe a proposed product concept and are not promises about a currently available product.</p></div>
    </section>

    <section class="section related-section"><div class="section-row">${sectionHead('Keep exploring', 'Related concepts', 'Other preview listings in this collection.')}</div><div class="grid grid-products">${related.map(productCard).join('')}</div></section>
  </main>`;
  const keywordSet = [...(product.keywords || []), ...(product.tags || [])].slice(0, 20);
  return shell({ title: `${product.name} — Preview listing`, description: `${product.tagline}. Illustrative product concept from the ${category.name} preview collection.`, route: product.url, body, keywords: keywordSet, productSlug: product.slug, type: 'product' });
}

function guidePage(guide) {
  const toc = guide.sections.map((section, index) => `<a href="#section-${index + 1}">${esc(section.h)}</a>`).join('');
  const sections = guide.sections.map((section, index) => `<section id="section-${index + 1}"><h2>${esc(section.h)}</h2><p>${esc(section.body)}</p></section>`).join('');
  const related = (guide.related || []).map((slug) => products.find((product) => product.slug === slug)).filter(Boolean);
  const body = `<main class="container" id="main">
    ${breadcrumb([{ label: 'Home', url: '/' }, { label: 'Field guides', url: '/#guides' }, { label: guide.title }])}
    <section class="page-head guide-head"><span class="eyebrow">Field guide · Updated ${BUILT_AT}</span><h1>${esc(guide.title)}</h1><p class="lede">${esc(guide.description)}</p><p class="guide-preview-note">Editorial preview. Verify market-specific claims and references before relying on this guide.</p></section>
    <article class="article">
      <nav class="toc" aria-label="On this page"><b>On this page</b>${toc}</nav>
      ${sections}
      <p class="guide-disclosure">This guide is general information for exploration, not professional, legal, or financial advice. Product links lead to sample preview listings.</p>
    </article>
    ${related.length ? `<section class="section related-section"><div class="section-row">${sectionHead('Related preview listings', 'Explore the concepts mentioned', '')}</div><div class="grid grid-products">${related.map(productCard).join('')}</div></section>` : ''}
  </main>`;
  const structuredData = { '@context': 'https://schema.org', '@type': 'Article', headline: guide.title, description: guide.description, datePublished: BUILT_AT, dateModified: BUILT_AT, author: { '@type': 'Organization', name: STORE_NAME }, mainEntityOfPage: `${SITE_URL}${guide.url}` };
  return shell({ title: guide.title, description: guide.description, route: guide.url, body, keywords: guide.keywords, type: 'article', structuredData });
}

function utilityContent(slug) {
  const bodyMap = {
    about: `<p><strong>${esc(STORE_NAME)}</strong> is a working storefront prototype for exploring a catalog of digital product concepts: prompt packs, agent skills, templates, creative assets, automations, and developer tools.</p>
      <h2>What this is</h2><p>A design and content preview with exactly 100 indexable pages: 75 sample product listings, 10 collections, 8 practical guides, six utility pages, and the home page. It is intended for review and testing.</p>
      <h2>What this is not</h2><p>It is not a live shop. Product assets have not been attached, checkout is disabled, and no customer orders can be placed. Listing copy and sample prices are illustrative and need verification before any commercial use.</p>
      <h2>Built for careful iteration</h2><p>The site is dependency-free and static-first. Optional Supabase support is documented separately; no database or payment provider is connected by default.</p>
      <p><a class="btn btn-secondary" href="/#categories">Explore collections ${icon('arrow')}</a></p>`,
    contact: `<p>This deployment is a storefront preview, so customer support operations are not live.</p>
      ${SUPPORT_EMAIL ? `<p>For preview feedback, email <a href="mailto:${attr(SUPPORT_EMAIL)}">${esc(SUPPORT_EMAIL)}</a>.</p>` : `<div class="notice-card"><strong>Support contact is not configured.</strong><p>Set <code>STORE_SUPPORT_EMAIL</code> before publishing a public storefront. No placeholder email address is shown.</p></div>`}
      <h2>Before a real launch</h2><ul><li>Configure a monitored support mailbox.</li><li>Test order confirmation, refunds, and digital file delivery.</li><li>Publish accurate business and refund details in the legal pages.</li></ul>`,
    faq: `<div class="faq-list">
      <details class="faq" open><summary>Is this a real store?</summary><div class="faq-a">No. It is a frontend and content preview. No payment processing or digital fulfillment is enabled.</div></details>
      <details class="faq"><summary>Are the sample product claims verified?</summary><div class="faq-a">No. The descriptions are illustrative concepts. Verify the features, formats, compatibility, and rights before selling anything.</div></details>
      <details class="faq"><summary>Can I use the sample prices?</summary><div class="faq-a">They are placeholders for layout testing only. Research costs, taxes, customer expectations, and pricing before launch.</div></details>
      <details class="faq"><summary>Does the cart charge me?</summary><div class="faq-a">No. The cart is a browser-only demo stored locally. Checkout does not call a payment provider.</div></details>
      <details class="faq"><summary>Can I change the language?</summary><div class="faq-a">The selector localizes navigation and UI labels in English, Indonesian, and Brazilian Portuguese. Product and editorial content remains in English for this preview.</div></details>
      <details class="faq"><summary>Is Supabase active?</summary><div class="faq-a">No Supabase credentials are included. The SQL migration and synchronization script are provided for a project owner to configure.</div></details>
      </div>`,
    license: `<p>License labels and price multipliers in the catalog are demonstration content, not an offer or a legal license grant.</p>
      <h2>Personal tier concept</h2><p>In a future product, this tier could cover one person using a product for their own work. The exact permissions, seat limits, redistribution rules, and support scope must be stated by the product owner.</p>
      <h2>Extended tier concept</h2><p>This label appears as a sample higher tier. It does not grant client, team, resale, or commercial rights on any actual asset because no asset is being sold here.</p>
      <h2>Before publishing real licenses</h2><ul><li>Define ownership of source files and derivative work.</li><li>Address client work, teams, seats, redistribution, and resale explicitly.</li><li>Have jurisdiction-appropriate counsel review the terms.</li></ul>
      <p>For the terms that apply to browsing this preview, see <a href="/terms">Terms of Use</a>.</p>`,
    privacy: `<p>This site is a static preview. It does not include an account system, payment processor, or real newsletter submission endpoint.</p>
      <h2>Browser storage</h2><p>The demo can store your theme, language selection, and cart contents in your browser's local storage so the interface works between pages. The demo cart is not sent to a server.</p>
      <h2>Optional analytics</h2><p>Analytics are disabled by default. If a site owner configures Supabase and enables the optional feature, this preview asks for consent before recording a page path and optional product slug in the access_logs table. The browser must contact the configured Supabase endpoint, which will receive the network metadata needed to serve that request; the access_logs table itself stores no visitor ID, email, user-agent, or referrer. Review provider-level logs, retention, database policies, and local privacy requirements before enabling it.</p>
      <h2>Demo forms</h2><p>No email address is collected unless a site owner separately configures a newsletter endpoint. In this preview, the feedback link opens the contact page instead of sending a form submission.</p>
      <h2>Choices</h2><p>You can decline optional analytics in the consent prompt. You can also clear local storage in your browser settings to remove the demo preferences and cart.</p>
      <h2>Before production</h2><p>Replace this notice with one that reflects the actual business, hosting, payment, analytics, and email services, and obtain legal review for the markets you serve.</p>`,
    terms: `<p><strong>This is a non-transactional preview.</strong> By browsing, you understand that the catalog listings, product features, sample prices, tiers, and editorial examples are for demonstration only.</p>
      <h2>No purchase or delivery</h2><p>No product is currently offered for sale through this site. Buttons that add items to the demo cart do not create an order or charge a payment method. No downloadable files are delivered.</p>
      <h2>Illustrative content</h2><p>Descriptions are not guarantees about a real product, integration, model compatibility, availability, update schedule, or commercial rights. Verify all details before making business or purchasing decisions.</p>
      <h2>Not professional advice</h2><p>Editorial guides are general information, not legal, financial, tax, security, or other professional advice. Get qualified advice for decisions that require it.</p>
      <h2>Future launch</h2><p>Before enabling sales, publish complete business identity, pricing, taxes, refunds, fulfillment timelines, support channels, and product-specific license terms. No such transaction terms are active in this preview.</p>
      <p>Questions about this preview? See <a href="/contact">Contact</a>.</p>`
  };
  return bodyMap[slug] || '<p>Page not found.</p>';
}

function utilityPage(page) {
  const body = `<main class="container" id="main">${breadcrumb([{ label: 'Home', url: '/' }, { label: page.title }])}<article class="prose-page"><span class="eyebrow">${page.slug === 'privacy' || page.slug === 'terms' || page.slug === 'license' ? 'Important information' : 'Obra Market'}</span><h1>${esc(page.title)}</h1><p class="utility-updated">Preview page · ${BUILT_AT}</p>${utilityContent(page.slug)}</article></main>`;
  const route = `/${page.slug}`;
  return shell({ title: page.title, description: page.description, route, body, type: 'website' });
}

function buildPage(route, type, title, html) {
  register(route, type, title);
  const file = route === '/' ? path.join(OUT_DIR, 'index.html') : path.join(OUT_DIR, `${route.slice(1)}.html`);
  writePage(file, html);
}

/* Fresh deterministic output; generated files remain outside Git via .gitignore. */
fs.rmSync(OUT_DIR, { recursive: true, force: true });
fs.mkdirSync(path.join(OUT_DIR, 'assets'), { recursive: true });
fs.copyFileSync(path.join(SRC_DIR, 'css', 'design-system.css'), path.join(OUT_DIR, 'assets', 'design-system.css'));
fs.copyFileSync(path.join(SRC_DIR, 'css', 'store-overrides.css'), path.join(OUT_DIR, 'assets', 'store-overrides.css'));
fs.cpSync(path.join(SRC_DIR, 'assets', 'fonts'), path.join(OUT_DIR, 'assets', 'fonts'), { recursive: true });
fs.cpSync(path.join(SRC_DIR, 'assets', 'licenses'), path.join(OUT_DIR, 'assets', 'licenses'), { recursive: true });
for (const file of ['app.js', 'i18n.js', 'supabase.js', 'catalog-loader.js']) {
  fs.copyFileSync(path.join(SRC_DIR, 'js', file), path.join(OUT_DIR, 'assets', file));
}
const catalogScript = `window.OBRA_CATALOG=${jsJson(products.map((product) => ({
  id: product.id, slug: product.slug, name: product.name, tagline: product.tagline,
  category: product.category, categoryName: product.categoryName, url: product.url,
  price: product.price, tags: product.tags || [], accent: product.accent, mock: product.mock
})))};\n`;
fs.writeFileSync(path.join(OUT_DIR, 'assets', 'catalog-data.js'), catalogScript, 'utf8');
fs.writeFileSync(path.join(OUT_DIR, 'assets', 'favicon.svg'), '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><defs><linearGradient id="g" x2="1" y2="1"><stop stop-color="#0070f3"/><stop offset=".55" stop-color="#7928ca"/><stop offset="1" stop-color="#ff0080"/></linearGradient></defs><rect width="64" height="64" rx="18" fill="url(#g)"/><path d="M16 44V20h7v4c2-3 5-5 9-5 7 0 12 5 12 13v12h-7V33c0-4-2-7-6-7s-8 3-8 8v10z" fill="white"/></svg>');

buildPage('/', 'home', `${STORE_NAME} — Digital tools for makers`, homePage());
for (const category of categories) buildPage(category.url, 'category', `${category.name} — Preview collection`, categoryPage(category));
for (const product of products) buildPage(product.url, 'product', `${product.name} — Preview listing`, productPage(product));
for (const guide of guides) buildPage(guide.url, 'guide', guide.title, guidePage(guide));
for (const page of utilityPages) buildPage(`/${page.slug}`, page.type, page.title, utilityPage(page));

const expectedPages = 1 + categories.length + products.length + guides.length + utilityPages.length;
if (expectedPages !== 100) throw new Error(`Expected exactly 100 pages, got ${expectedPages}`);
if (pageManifest.length !== 100) throw new Error(`Generated ${pageManifest.length} routes, expected exactly 100`);

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${pageManifest.map((page) => `  <url><loc>${esc(`${SITE_URL}${page.route === '/' ? '/' : page.route}`)}</loc><lastmod>${BUILT_AT}</lastmod></url>`).join('\n')}\n</urlset>\n`;
fs.writeFileSync(path.join(OUT_DIR, 'sitemap.xml'), sitemap, 'utf8');
fs.writeFileSync(path.join(OUT_DIR, 'robots.txt'), `User-agent: *\nAllow: /\nSitemap: ${SITE_URL}/sitemap.xml\n`, 'utf8');
const counts = { home: 1, collections: categories.length, productPreviews: products.length, guides: guides.length, utility: utilityPages.length };
const manifest = { builtAt: BUILT_AT, siteUrl: SITE_URL, pageCount: pageManifest.length, counts, pages: pageManifest };
fs.writeFileSync(path.join(OUT_DIR, 'page-manifest.json'), `${JSON.stringify(manifest, null, 2)}\n`, 'utf8');
const progressLog = {
  project: STORE_NAME,
  targetPages: 100,
  generatedPages: pageManifest.length,
  progress: `${pageManifest.length}/100 generated`,
  generationStatus: pageManifest.length === 100 ? 'complete' : 'incomplete',
  deploymentStatus: 'not verified by local build',
  supabaseStatus: SUPABASE_URL && SUPABASE_ANON_KEY ? 'credentials configured; database connection not tested' : 'not configured',
  builtAt: BUILT_AT,
  counts
};
const progressJson = `${JSON.stringify(progressLog, null, 2)}\n`;
fs.writeFileSync(path.join(ROOT, 'progress_log.json'), progressJson, 'utf8');
fs.writeFileSync(path.join(OUT_DIR, 'progress_log.json'), progressJson, 'utf8');

console.log(`Generated ${pageManifest.length} static HTML pages in ${path.relative(ROOT, OUT_DIR)}/`);
console.log(`  1 home + ${categories.length} collections + ${products.length} product previews + ${guides.length} guides + ${utilityPages.length} utility pages`);
console.log(`  Site URL: ${SITE_URL}`);
console.log(`  Supabase: ${SUPABASE_URL && SUPABASE_ANON_KEY ? 'public catalog read enabled (analytics remains consent-gated)' : 'not configured; bundled catalog only'}`);
