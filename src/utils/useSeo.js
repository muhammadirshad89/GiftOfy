import { useEffect } from 'react';
import { DEFAULT_DESC, DEFAULT_SOCIAL_DESC, DEFAULT_TITLE, ROBOTS_INDEX, ROBOTS_NOINDEX } from '../seo/routes.js';
import { titleize } from '../seo/format.js';

const meta = (k, v) => () => { const e = document.createElement('meta'); e.setAttribute(k, v); return e; };
const link = () => { const e = document.createElement('link'); e.rel = 'canonical'; return e; };
function upsert(sel, make, val) {
  let e = document.head.querySelector(sel);
  if (!e) { e = make(); document.head.appendChild(e); }
  e.setAttribute(e.tagName === 'LINK' ? 'href' : 'content', val);
}

/**
 * Per-page title, description, canonical, Open Graph, Twitter and robots, for client-side navigation
 * (clicking a <Link> does not reload the document). The *initial* HTML of every route is produced
 * separately -- by scripts/prerender.mjs for public pages and middleware.js for everything else -- from
 * the same registry (src/data/pageMeta.js, src/seo/routes.js), so crawlers that do not run JavaScript see
 * identical values. og:image/twitter:image are sitewide (index.html).
 */
export default function useSeo({ title, description = DEFAULT_DESC, socialDescription, path, noindex = false }) {
  useEffect(() => {
    const t = titleize(title, DEFAULT_TITLE);
    const socialDesc = socialDescription || (description === DEFAULT_DESC ? DEFAULT_SOCIAL_DESC : description);
    const url = (import.meta.env.VITE_SITE_URL || window.location.origin) + (path ?? window.location.pathname);
    document.title = t;
    upsert('meta[name="description"]', meta('name', 'description'), description);
    upsert('meta[name="robots"]', meta('name', 'robots'), noindex ? ROBOTS_NOINDEX : ROBOTS_INDEX);
    upsert('link[rel="canonical"]', link, url);
    upsert('meta[property="og:title"]', meta('property', 'og:title'), t);
    upsert('meta[property="og:description"]', meta('property', 'og:description'), socialDesc);
    upsert('meta[property="og:url"]', meta('property', 'og:url'), url);
    upsert('meta[name="twitter:title"]', meta('name', 'twitter:title'), t);
    upsert('meta[name="twitter:description"]', meta('name', 'twitter:description'), socialDesc);
  }, [title, description, socialDescription, path, noindex]);
}
