import { useEffect } from 'react';

const DEFAULT_DESC = 'GiftOfy helps you create a personalized digital wish, choose a design and share it with someone you love.';
const meta = (k, v) => () => { const e = document.createElement('meta'); e.setAttribute(k, v); return e; };
const link = () => { const e = document.createElement('link'); e.rel = 'canonical'; return e; };
function upsert(sel, make, val) {
  let e = document.head.querySelector(sel);
  if (!e) { e = make(); document.head.appendChild(e); }
  e.setAttribute(e.tagName === 'LINK' ? 'href' : 'content', val);
}

/** Per-page title, description, canonical, Open Graph and robots. */
export default function useSeo({ title, description = DEFAULT_DESC, path, noindex = false }) {
  useEffect(() => {
    const t = title ? `${title} · GiftOfy` : 'GiftOfy · Create a Wish. Share the Moment. Send a Gift.';
    const url = (import.meta.env.VITE_SITE_URL || window.location.origin) + (path ?? window.location.pathname);
    document.title = t;
    upsert('meta[name="description"]', meta('name', 'description'), description);
    upsert('meta[name="robots"]', meta('name', 'robots'), noindex ? 'noindex,nofollow' : 'index,follow');
    upsert('meta[property="og:title"]', meta('property', 'og:title'), t);
    upsert('meta[property="og:description"]', meta('property', 'og:description'), description);
    upsert('meta[property="og:url"]', meta('property', 'og:url'), url);
    upsert('link[rel="canonical"]', link, url);
  }, [title, description, path, noindex]);
}
