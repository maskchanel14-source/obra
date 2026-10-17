import test, { before } from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
let content;
let htmlFiles;
let inventory;

function walk(dir) {
  return readdirSync(dir).flatMap((name) => {
    const full = path.join(dir, name);
    return statSync(full).isDirectory() ? walk(full) : [full];
  });
}

function read(relative) {
  return readFileSync(path.join(dist, relative), 'utf8');
}

function plainText(html) {
  return html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, ' ')
    .replace(/<[^>]+>/g, ' ').replace(/&(?:[a-z]+|#\d+);/gi, ' ')
    .replace(/\s+/g, ' ').trim();
}

before(async () => {
  content = await import('../content.mjs');
  const result = spawnSync(process.execPath, ['scripts/build.mjs'], {
    cwd: root, encoding: 'utf8', env: { ...process.env, SITE_URL: 'https://balcao-guias.vercel.app' },
  });
  assert.equal(result.status, 0, `Build failed:\n${result.stdout}\n${result.stderr}`);
  htmlFiles = walk(dist).filter((file) => file.endsWith('.html'));
  inventory = JSON.parse(readFileSync(path.join(root, 'data/keywords.json'), 'utf8'));
});

test('one substantial home guide and 99 distinct scenario briefs', () => {
  const { HOME, GUIDES, WORKFLOWS, SECTORS } = content;
  assert.equal(SECTORS.length, 11);
  assert.equal(WORKFLOWS.length, 9);
  assert.equal(GUIDES.length, 99);
  assert.equal(new Set([HOME.keyword, ...GUIDES.map((guide) => guide.keyword)]).size, 100);
  assert.equal(new Set(GUIDES.map((guide) => guide.slug)).size, 99);
  for (const guide of GUIDES) {
    const scenario = guide.scenario;
    for (const field of ['scene', 'question', 'reply', 'firstStep', 'handoff', 'check']) {
      assert.ok(scenario[field]?.length >= 25, `${guide.slug}: ${field} needs an editorial detail`);
    }
  }
  assert.equal(new Set(GUIDES.map((guide) => guide.scenario.reply)).size, 99);
  assert.equal(new Set(GUIDES.map((guide) => guide.scenario.check)).size, 99);
});

test('exactly 100 static HTML pages and a matching 100-keyword JSON inventory', () => {
  assert.equal(htmlFiles.length, 100);
  assert.equal(inventory.length, 100);
  assert.equal(new Set(inventory.map(({ keyword }) => keyword)).size, 100);
  assert.deepEqual(new Set(inventory.map(({ url }) => url)),
    new Set(['/', ...content.GUIDES.map(({ url }) => url)]));
  assert.ok(htmlFiles.some((file) => file === path.join(dist, 'index.html')));
});

test('every page has localized unique metadata, an affiliate placeholder, and useful copy', () => {
  const titles = new Set();
  const descriptions = new Set();
  for (const file of htmlFiles) {
    const html = readFileSync(file, 'utf8');
    const relative = path.relative(dist, file);
    const pathname = relative === 'index.html' ? '/' : `/${relative.replace(/index\.html$/, '')}`;
    const canonical = `https://balcao-guias.vercel.app${pathname}`;
    assert.match(html, /^<!doctype html>/i, relative);
    assert.match(html, /<html lang="pt-BR">/, relative);
    assert.equal((html.match(/<h1\b/g) ?? []).length, 1, relative);
    assert.match(html, /<main id="conteudo">/, relative);
    assert.match(html, /<a class="skip-link" href="#conteudo">/, relative);
    assert.match(html, new RegExp(`<link rel="canonical" href="${canonical}"`), relative);
    assert.match(html, /<meta property="og:image" content="https:\/\//, relative);
    assert.match(html, /<meta name="twitter:card" content="summary_large_image">/, relative);
    assert.match(html, /data-affiliate="INSERT_YOUR_REF"/, relative);
    assert.doesNotMatch(html, /href="(?:YOUR_AFFILIATE_LINK|#)"/, relative);
    const title = html.match(/<title>([^<]+)<\/title>/)?.[1];
    const description = html.match(/<meta name="description" content="([^"]+)">/)?.[1];
    assert.ok(title?.length > 25 && title.length <= 70, `${relative}: title`);
    assert.ok(description?.length > 75 && description.length < 190, `${relative}: description`);
    titles.add(title);
    descriptions.add(description);
    const words = plainText(html).split(/\s+/u).length;
    assert.ok(words >= 350, `${relative}: only ${words} visible words`);
  }
  assert.equal(titles.size, 100);
  assert.equal(descriptions.size, 100);
});

test('sitemap, robots and internal links resolve to built pages or real sections', () => {
  const sitemap = read('sitemap.xml');
  const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
  assert.equal(urls.length, 100);
  assert.equal(new Set(urls).size, 100);
  assert.deepEqual(new Set(urls),
    new Set(['/', ...content.GUIDES.map(({ url }) => url)].map((url) => `https://balcao-guias.vercel.app${url}`)));
  assert.match(read('robots.txt'), /Sitemap: https:\/\/balcao-guias\.vercel\.app\/sitemap\.xml/);
  for (const file of htmlFiles) {
    const html = readFileSync(file, 'utf8');
    for (const [, href] of html.matchAll(/<a\b[^>]*\bhref="([^"]+)"/g)) {
      if (/^https:\/\//.test(href)) continue;
      assert.ok(href.startsWith('/') || href.startsWith('#'), `${file}: unexpected href ${href}`);
      const [url, anchor] = href.split('#');
      const target = url ? path.join(dist, url, 'index.html') : file;
      assert.ok(htmlFiles.includes(target), `${file}: broken page link ${href}`);
      if (anchor) {
        assert.ok(readFileSync(target, 'utf8').includes(`id="${anchor}"`),
          `${file}: broken section link ${href}`);
      }
    }
  }
});

test('small-screen, keyboard and reduced-motion styles plus real social asset exist', () => {
  const css = read('assets/site.css');
  assert.match(css, /:focus-visible/);
  assert.match(css, /prefers-reduced-motion/);
  assert.match(css, /max-width:\s*720px/);
  assert.ok(statSync(path.join(dist, 'assets', 'social-card.png')).size > 1000);
  assert.ok(statSync(path.join(dist, 'assets', 'site.js')).size > 100);
});

test('dynamic strings are HTML-escaped and source descriptions are not executable', async () => {
  const { escapeHtml, safeJson } = await import('../scripts/html.mjs');
  assert.equal(escapeHtml('<img src=x onerror="go()"> &'),
    '&lt;img src=x onerror=&quot;go()&quot;&gt; &amp;');
  assert.ok(!safeJson({ title: '</script><script>alert(1)</script>' }).includes('</script>'));
});
