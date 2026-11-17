// Build-time pre-rendering (runs after `vite build`, see "build" in package.json).
//
// Why: GiftOfy is a client-rendered React SPA. Googlebot can run JavaScript, but many other crawlers, AI answer
// engines, link previewers and ad-review tools read only the raw HTML -- which for an SPA is an empty <div id="root">.
// This writes the fully rendered HTML of every public page to dist/_pre/<path>.html; middleware.js serves it, and
// src/main.jsx hydrates it in the browser. No framework migration: it renders the same <App /> the browser runs.
//
// How: bundle scripts/prerender-entry.jsx with esbuild (already installed as a dependency of Vite), import it in
// Node, call render(path) for each row of the page registry, and inject the result into dist/index.html.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const fail = (m) => { console.error(`\n[prerender] ERROR: ${m}\n`); process.exit(1); };

if (!fs.existsSync(path.join(dist, 'index.html'))) fail('dist/index.html not found. Run "vite build" first (npm run build does both).');
let render;
try { render = await (await import('./prerender-lib.mjs')).loadRenderer(root); }
catch (e) { fail(`could not bundle or load the renderer: ${e.message}\nIf this mentions "esbuild", run "npm ci" (esbuild is installed with Vite).`); }
const { PAGE_META } = await import(pathToFileURL(path.join(root, 'src/data/pageMeta.js')).href);
const { seoForPath } = await import(pathToFileURL(path.join(root, 'src/seo/routes.js')).href);
const { applySeo } = await import(pathToFileURL(path.join(root, 'src/seo/applySeo.js')).href);
const { buildSitemapXml } = await import(pathToFileURL(path.join(root, 'src/seo/sitemap.js')).href);
const { SITE_URL } = await import(pathToFileURL(path.join(root, 'src/data/siteConfig.js')).href);

const shell = fs.readFileSync(path.join(dist, 'index.html'), 'utf8').replace(/\r\n/g, '\n');
const MOUNT = '<div id="root"></div>';
if (!shell.includes(MOUNT)) fail(`dist/index.html does not contain ${MOUNT}; the pre-renderer cannot inject content.`);

const ARTICLE = new Set(['occasion', 'recipient', 'guide']);
let n = 0;
for (const page of PAGE_META) {
  const seo = seoForPath(page.path);
  const body = await render(page.path);
  if ((body.match(/<h1[ >]/g) || []).length !== 1) fail(`${page.path} rendered ${(body.match(/<h1[ >]/g) || []).length} <h1> elements (expected exactly 1).`);
  if (/Oops! This page could not be found/.test(body)) fail(`${page.path} rendered the not-found page: its route is missing from src/App.jsx.`);
  let html = shell.replace(MOUNT, () => `<div id="root" data-prerendered="1">${body}</div>`);
  html = applySeo(html, seo, `${SITE_URL}${seo.canonicalPath}`, { ogType: ARTICLE.has(page.group) ? 'article' : undefined });
  const file = path.join(dist, '_pre', page.path === '/' ? 'index.html' : `${page.path.slice(1)}.html`);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, html);
  n += 1;
}
fs.writeFileSync(path.join(dist, 'sitemap.xml'), buildSitemapXml());
console.log(`[prerender] wrote ${n} pre-rendered pages to dist/_pre and dist/sitemap.xml (${PAGE_META.length} URLs).`);
