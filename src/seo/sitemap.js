import { SITE_URL } from '../data/siteConfig.js';
import { PAGE_META } from '../data/pageMeta.js';

/** The sitemap lists exactly the indexable, canonical URLs in the page registry (nothing private, nothing duplicated). */
export function buildSitemapXml() {
  const urls = PAGE_META.map((p) => `<url><loc>${SITE_URL}${p.path}</loc><lastmod>${p.updated}</lastmod></url>`).join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}
