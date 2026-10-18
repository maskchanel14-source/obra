#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const problems = [];
const check = (condition, message) => { if (!condition) problems.push(message); };
const manifestPath = path.join(dist, 'page-manifest.json');
if (!fs.existsSync(manifestPath)) {
  console.error('No built site found. Run npm run build first.');
  process.exit(1);
}
const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
check(manifest.pageCount === 100, `Manifest says ${manifest.pageCount} pages, expected 100`);
check(manifest.pages.length === 100, `Manifest has ${manifest.pages.length} route records, expected 100`);
check(manifest.counts.home === 1, 'Expected exactly 1 home page');
check(manifest.counts.collections === 10, `Expected 10 collection pages, got ${manifest.counts.collections}`);
check(manifest.counts.productPreviews === 75, `Expected 75 product pages, got ${manifest.counts.productPreviews}`);
check(manifest.counts.guides === 8, `Expected 8 guide pages, got ${manifest.counts.guides}`);
check(manifest.counts.utility === 6, `Expected 6 utility pages, got ${manifest.counts.utility}`);

const seenRoutes = new Set();
const seenTitles = new Set();
const htmlByRoute = new Map();
function pageFile(route) {
  return route === '/' ? path.join(dist, 'index.html') : path.join(dist, `${route.slice(1)}.html`);
}
for (const page of manifest.pages) {
  check(!seenRoutes.has(page.route), `Duplicate route ${page.route}`);
  seenRoutes.add(page.route);
  const file = pageFile(page.route);
  check(fs.existsSync(file), `Missing HTML file for ${page.route}`);
  if (!fs.existsSync(file)) continue;
  const html = fs.readFileSync(file, 'utf8');
  htmlByRoute.set(page.route, html);
  check(/<!doctype html>/i.test(html), `${page.route}: missing HTML doctype`);
  check(/<title>[^<]+<\/title>/i.test(html), `${page.route}: missing title`);
  check(/<meta name="description" content="[^"]+"/i.test(html), `${page.route}: missing meta description`);
  check(/rel="canonical" href="https?:\/\//i.test(html), `${page.route}: missing absolute canonical`);
  check(/<main\b/i.test(html), `${page.route}: missing main landmark`);
  check(/id="main"/i.test(html), `${page.route}: missing skip-link target`);
  check(/<html lang="en"/i.test(html), `${page.route}: missing source language`);
  check(/name="viewport"/i.test(html), `${page.route}: missing responsive viewport`);
  check(!/<img\b(?![^>]*\balt=)/i.test(html), `${page.route}: image without alt text`);
  check(!/undefined|null ·/i.test(html), `${page.route}: obvious unresolved data`);
  const title = (html.match(/<title>([^<]+)<\/title>/i) || [])[1];
  if (title) {
    check(!seenTitles.has(title), `Duplicate title: ${title}`);
    seenTitles.add(title);
  }
}

function resolveLocal(href, currentRoute) {
  if (!href || /^(?:https?:|mailto:|tel:|data:|javascript:|\/\/)/i.test(href)) return null;
  let resolved;
  try { resolved = new URL(href, `https://site.invalid${currentRoute}`); } catch { return { error: `Malformed link ${href}` }; }
  if (resolved.origin !== 'https://site.invalid') return null;
  const pathname = decodeURIComponent(resolved.pathname);
  if (pathname.startsWith('/assets/')) return path.join(dist, pathname.slice(1));
  if (pathname === '/') return path.join(dist, 'index.html');
  const candidate = path.join(dist, `${pathname.slice(1)}${path.extname(pathname) ? '' : '.html'}`);
  return candidate;
}
for (const [route, html] of htmlByRoute) {
  const anchors = new Set(Array.from(html.matchAll(/\bid="([^"]+)"/g), (match) => match[1]));
  for (const match of html.matchAll(/\bhref="([^"]+)"/g)) {
    const href = match[1];
    const target = resolveLocal(href, route);
    if (!target) continue;
    if (target.error) { problems.push(`${route}: ${target.error}`); continue; }
    check(fs.existsSync(target), `${route}: broken local link ${href}`);
    const parsed = new URL(href, `https://site.invalid${route}`);
    if (parsed.hash && parsed.pathname === route) {
      check(anchors.has(decodeURIComponent(parsed.hash.slice(1))), `${route}: missing anchor ${parsed.hash}`);
    } else if (parsed.hash && parsed.origin === 'https://site.invalid') {
      const targetRoute = parsed.pathname === '/' ? '/' : parsed.pathname.replace(/\.html$/, '');
      const targetHtml = htmlByRoute.get(targetRoute);
      if (targetHtml) {
        const targetIds = new Set(Array.from(targetHtml.matchAll(/\bid="([^"]+)"/g), (item) => item[1]));
        check(targetIds.has(decodeURIComponent(parsed.hash.slice(1))), `${route}: missing anchor ${href}`);
      }
    }
  }
}

const sitemapPath = path.join(dist, 'sitemap.xml');
const sitemap = fs.readFileSync(sitemapPath, 'utf8');
const sitemapCount = (sitemap.match(/<url>/g) || []).length;
check(sitemapCount === 100, `Sitemap has ${sitemapCount} URLs, expected 100`);
check(fs.existsSync(path.join(dist, 'robots.txt')), 'robots.txt is missing');
check(fs.existsSync(path.join(dist, 'assets', 'design-system.css')), 'design system CSS is missing');
check(fs.existsSync(path.join(dist, 'assets', 'store-overrides.css')), 'store CSS is missing');
check(fs.existsSync(path.join(dist, 'assets', 'app.js')), 'app JavaScript is missing');
check(fs.existsSync(path.join(dist, 'assets', 'catalog-data.js')), 'catalog data bundle is missing');
check(fs.existsSync(path.join(dist, 'progress_log.json')), 'progress log is missing');
const progressLog = JSON.parse(fs.readFileSync(path.join(dist, 'progress_log.json'), 'utf8'));
check(progressLog.generatedPages === 100 && progressLog.targetPages === 100, 'progress log does not record 100/100 pages');
check(fs.existsSync(path.join(dist, 'assets', 'fonts', 'space-grotesk-400.woff')), 'Space Grotesk font asset is missing');
check(fs.existsSync(path.join(dist, 'assets', 'fonts', 'jetbrains-mono-400.woff')), 'JetBrains Mono font asset is missing');
check(fs.existsSync(path.join(dist, 'assets', 'licenses', 'SpaceGrotesk-OFL.txt')), 'Space Grotesk license is missing');
check(fs.existsSync(path.join(dist, 'assets', 'licenses', 'JetBrainsMono-OFL.txt')), 'JetBrains Mono license is missing');

for (const cssName of ['design-system.css', 'store-overrides.css']) {
  const css = fs.readFileSync(path.join(dist, 'assets', cssName), 'utf8');
  check((css.match(/{/g) || []).length === (css.match(/}/g) || []).length, `${cssName}: unbalanced CSS braces`);
}
const pageFiles = [];
function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    else if (entry.isFile() && full.endsWith('.html')) pageFiles.push(full);
  }
}
walk(dist);
check(pageFiles.length === 100, `Expected exactly 100 HTML files in dist, got ${pageFiles.length}`);

const categoryData = JSON.parse(fs.readFileSync(path.join(root, 'data', 'categories.json'), 'utf8'));
const guideData = JSON.parse(fs.readFileSync(path.join(root, 'data', 'guides.json'), 'utf8'));
const products = fs.readdirSync(path.join(root, 'data')).filter((name) => name.startsWith('products-') && name.endsWith('.json')).flatMap((name) => JSON.parse(fs.readFileSync(path.join(root, 'data', name), 'utf8')));
check(categoryData.length === 10, `Category data has ${categoryData.length} entries`);
check(guideData.length === 8, `Guide data has ${guideData.length} entries`);
check(products.length === 75, `Product data has ${products.length} entries`);
check(products.every((product) => product.description && product.features && product.faqs), 'Some product entries are missing descriptions, features, or FAQs');
check(products.every((product) => !('rating' in product) && !('ratingsCount' in product) && !('sales' in product) && !('bestSeller' in product)), 'Catalog data must not contain fabricated popularity or review counts');
check(guideData.every((guide) => guide.sections.length >= 4), 'Every guide should include at least four substantive sections');

if (problems.length) {
  console.error(`Validation failed with ${problems.length} issue(s):`);
  problems.forEach((problem) => console.error(`- ${problem}`));
  process.exit(1);
}
console.log('Validation passed: exactly 100 HTML pages/routes and sitemap entries; local links, page metadata, landmarks, CSS, and catalog checks are clean.');
