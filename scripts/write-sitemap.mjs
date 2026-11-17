// Regenerates public/sitemap.xml from the page registry. Run: npm run seo:sitemap
// (the build also writes dist/sitemap.xml itself; a test fails if public/sitemap.xml drifts from the registry).
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const { buildSitemapXml } = await import(pathToFileURL(path.join(root, 'src/seo/sitemap.js')).href);
fs.writeFileSync(path.join(root, 'public', 'sitemap.xml'), buildSitemapXml());
console.log('public/sitemap.xml updated.');
