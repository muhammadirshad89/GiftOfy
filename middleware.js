// Vercel Edge Middleware. Runs before the SPA rewrite in vercel.json for every non-file request, so the
// *initial* HTML response already has the right <title>, description, canonical, robots, Open Graph and
// Twitter tags -- and, for public pages, the full pre-rendered page body -- even for crawlers and link-preview
// bots that do not run JavaScript.
//
// Framework-agnostic (standard Request/Response/URL/fetch): this project is a plain Vite + React Router SPA.
//
// What it does, in order:
//  1. Canonicalizes trailing slashes (308) -- "/" itself is never redirected.
//  2. Resolves the path with src/seo/routes.js (the same function the build-time pre-renderer and the tests use):
//     indexable page | /create/:occasion | private (/wish, /reply, /admin: noindex) | unknown (real HTTP 404).
//  3. For indexable pages, serves the pre-rendered HTML that scripts/prerender.mjs wrote to /_pre/<path>.html at build time
//     (falls back to the plain SPA shell if that file is missing, so a pre-render problem can never take the site down).
//  4. Applies the route's SEO tags to whichever HTML it is serving.
import { seoForPath } from './src/seo/routes.js';
import { applySeo } from './src/seo/applySeo.js';
import { SITE_URL } from './src/data/siteConfig.js';

export const config = {
  // Everything EXCEPT: /assets/*, /_pre/* (pre-rendered files, fetched below) and any path ending in a static-file
  // extension. The extension rule is what keeps /google0da64d656286dcbb.html (Search Console verification), /ads.txt,
  // /robots.txt, /sitemap.xml, /llms.txt, /sw.js, images, fonts etc. served as the real files instead of HTML.
  matcher: '/((?!assets/|_pre/|[^?]*\\.(?:html?|css|js|mjs|json|txt|xml|png|jpe?g|webp|gif|svg|ico|woff2?|ttf|otf|map|webmanifest)).*)',
};

const ARTICLE_GROUPS = new Set(['occasion', 'recipient', 'guide']);
const looksPrerendered = (res, body) => res.ok && (res.headers.get('content-type') || '').includes('text/html') && body.includes('data-prerendered="1"');

async function prerendered(origin, pathname) {
  try {
    const res = await fetch(new URL(`/_pre${pathname === '/' ? '/index' : pathname}.html`, origin));
    const body = await res.text();
    return looksPrerendered(res, body) ? body : null;
  } catch { return null; }
}

export default async function middleware(request) {
  const url = new URL(request.url);
  if (url.pathname.length > 1 && url.pathname.endsWith('/')) {
    return Response.redirect(new URL(url.pathname.slice(0, -1) + url.search, url.origin), 308);
  }
  const seo = seoForPath(url.pathname);

  let html = seo.prerendered ? await prerendered(url.origin, url.pathname) : null;
  if (!html) {
    const shell = await fetch(new URL('/index.html', url.origin));
    if (!shell.ok) return shell; // fall back to whatever the platform would otherwise serve
    html = await shell.text();
  }
  const canonical = `${SITE_URL}${seo.canonicalPath ?? url.pathname}`;
  const ogType = seo.meta && ARTICLE_GROUPS.has(seo.meta.group) ? 'article' : undefined;
  return new Response(applySeo(html, seo, canonical, { ogType }), {
    status: seo.status, // 404 for unknown paths (the SPA shell still renders its friendly not-found page)
    headers: { 'content-type': 'text/html; charset=utf-8' },
  });
}
