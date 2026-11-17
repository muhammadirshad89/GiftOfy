// Rewrites the SEO-relevant tags of an HTML document string. Pure string work so it runs unchanged in
// the Vercel edge runtime (middleware.js) and in Node (scripts/prerender.mjs). Only these tags are
// touched: og:image, twitter:card, the AdSense/Chatzy scripts and the sitewide JSON-LD are left alone.
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;');
const swap = (html, re, replacement) => html.replace(re, () => replacement);

export function applySeo(html, seo, url, { ogType } = {}) {
  let out = html;
  out = swap(out, /<title>.*?<\/title>/s, `<title>${esc(seo.title)}</title>`);
  out = swap(out, /<meta name="description" content=".*?">/s, `<meta name="description" content="${esc(seo.description)}">`);
  out = swap(out, /<meta name="robots" content=".*?">/s, `<meta name="robots" content="${seo.robots}">`);
  out = swap(out, /<link rel="canonical" href=".*?">/s, `<link rel="canonical" href="${esc(url)}">`);
  out = swap(out, /<meta property="og:url" content=".*?">/s, `<meta property="og:url" content="${esc(url)}">`);
  out = swap(out, /<meta property="og:title" content=".*?">/s, `<meta property="og:title" content="${esc(seo.title)}">`);
  out = swap(out, /<meta property="og:description" content=".*?">/s, `<meta property="og:description" content="${esc(seo.social)}">`);
  out = swap(out, /<meta name="twitter:title" content=".*?">/s, `<meta name="twitter:title" content="${esc(seo.title)}">`);
  out = swap(out, /<meta name="twitter:description" content=".*?">/s, `<meta name="twitter:description" content="${esc(seo.social)}">`);
  if (ogType) out = swap(out, /<meta property="og:type" content=".*?">/s, `<meta property="og:type" content="${ogType}">`);
  return out;
}
