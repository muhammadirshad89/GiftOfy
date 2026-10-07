import { useEffect } from 'react';

// Matches the live homepage's reconciled values (see index.html). Two distinct descriptions are
// intentional: the long one is for <meta name="description"> (search snippets), the shorter one
// for Open Graph/Twitter cards (social previews favor brevity) -- this mirrors what was already
// live before this file started managing it, rather than merging them into one.
const DEFAULT_TITLE = 'GiftOfy – Create Digital Wishes & Share Special Moments';
const DEFAULT_DESC = 'Create beautiful personalized digital wishes for birthdays, anniversaries, weddings, Eid, Valentine’s Day and more. Choose a design, personalize your message and share your wish with anyone.';
const DEFAULT_SOCIAL_DESC = 'Create beautiful personalized digital wishes and share special moments with the people you care about.';

const meta = (k, v) => () => { const e = document.createElement('meta'); e.setAttribute(k, v); return e; };
const link = () => { const e = document.createElement('link'); e.rel = 'canonical'; return e; };
function upsert(sel, make, val) {
  let e = document.head.querySelector(sel);
  if (!e) { e = make(); document.head.appendChild(e); }
  e.setAttribute(e.tagName === 'LINK' ? 'href' : 'content', val);
}

/**
 * Per-page title, description, canonical, Open Graph, Twitter and robots -- for client-side
 * navigation within the SPA (clicking a <Link> doesn't reload the document, so these need to be
 * updated by hand). The *initial* server-delivered HTML for each route is handled separately by
 * middleware.js, so crawlers/link-preview bots that don't execute JavaScript still see correct,
 * route-specific tags without waiting for this to run. og:image/twitter:image are never touched
 * here -- there's one sitewide default (set once in index.html) until per-wish images exist.
 */
export default function useSeo({ title, description = DEFAULT_DESC, socialDescription, path, noindex = false }) {
  useEffect(() => {
    const t = title ? `${title} · GiftOfy` : DEFAULT_TITLE;
    const socialDesc = socialDescription || description || DEFAULT_SOCIAL_DESC;
    const url = (import.meta.env.VITE_SITE_URL || window.location.origin) + (path ?? window.location.pathname);
    document.title = t;
    upsert('meta[name="description"]', meta('name', 'description'), description);
    upsert('meta[name="robots"]', meta('name', 'robots'), noindex ? 'noindex,nofollow' : 'index,follow,max-image-preview:large');
    upsert('link[rel="canonical"]', link, url);
    upsert('meta[property="og:title"]', meta('property', 'og:title'), t);
    upsert('meta[property="og:description"]', meta('property', 'og:description'), socialDesc);
    upsert('meta[property="og:url"]', meta('property', 'og:url'), url);
    upsert('meta[name="twitter:title"]', meta('name', 'twitter:title'), t);
    upsert('meta[name="twitter:description"]', meta('name', 'twitter:description'), socialDesc);
  }, [title, description, socialDescription, path, noindex]);
}
