#!/usr/bin/env node
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', 'dist');
const port = Number(process.env.PORT || 4173);
const host = '0.0.0.0';
const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.json': 'application/json; charset=utf-8', '.svg': 'image/svg+xml', '.xml': 'application/xml; charset=utf-8', '.txt': 'text/plain; charset=utf-8' };

if (!fs.existsSync(path.join(root, 'index.html'))) {
  console.error('Build the site first: npm run build');
  process.exit(1);
}

http.createServer((req, res) => {
  let pathname;
  try { pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname); }
  catch { res.writeHead(400); res.end('Bad request'); return; }
  if (pathname.includes('\0') || pathname.split('/').includes('..')) { res.writeHead(400); res.end('Bad request'); return; }
  let candidate = pathname === '/' ? path.join(root, 'index.html') : path.resolve(root, `.${pathname}`);
  if (!candidate.startsWith(root + path.sep) && candidate !== path.join(root, 'index.html')) { res.writeHead(403); res.end('Forbidden'); return; }
  if (fs.existsSync(candidate) && fs.statSync(candidate).isDirectory()) candidate = path.join(candidate, 'index.html');
  if (!fs.existsSync(candidate) && !path.extname(candidate)) candidate += '.html';
  if (!fs.existsSync(candidate) || !fs.statSync(candidate).isFile()) { res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' }); res.end('Not found'); return; }
  const ext = path.extname(candidate);
  res.writeHead(200, { 'Content-Type': types[ext] || 'application/octet-stream', 'X-Content-Type-Options': 'nosniff' });
  fs.createReadStream(candidate).pipe(res);
}).listen(port, host, () => console.log(`Obra Market preview listening on http://${host}:${port}`));
