// Vercel Edge Middleware. Runs before the SPA rewrite in vercel.json, for every non-asset request,
// so the *initial* HTML response already has the right <title>/description/canonical/robots/OG/
// Twitter tags for that route -- not just after React mounts. This is what makes link-preview bots
// (WhatsApp, Facebook, Twitter/X don't run JS) and non-JS crawlers see correct, route-specific
// metadata instead of the generic homepage shell every time.
//
// Deliberately framework-agnostic (standard Request/Response/URL/fetch, no Next.js APIs), since
// this project is a plain Vite + React Router SPA, not Next.js -- Vercel's platform-level Edge
// Middleware works the same way regardless of framework.
//
// Pulls titles/descriptions from the SAME data files the client components already render from
// (src/data/seoPages.js, src/data/content.js), so there is exactly one source of truth: update a
// page's copy there and both the server-delivered HTML and the client-side useSeo.js update together.
import { SEO_PAGES } from './src/data/seoPages.js';
import { PAGES } from './src/data/content.js';

export const config = {
  // Everything except: known static files at the root, and anything with a file extension
  // (covers /assets/*.js|css, favicon.svg, og-default.png, robots.txt, sitemap.xml, index.html).
  matcher: '/((?!assets/|favicon\\.svg|og-default\\.png|robots\\.txt|sitemap\\.xml|index\\.html).*)',
};

const SITE = 'https://giftofy.vercel.app';
const DEFAULT_TITLE = 'GiftOfy – Create Digital Wishes & Share Special Moments';
const DEFAULT_DESC = 'Create beautiful personalized digital wishes for birthdays, anniversaries, weddings, Eid, Valentine’s Day and more. Choose a design, personalize your message and share your wish with anyone.';
const DEFAULT_SOCIAL_DESC = 'Create beautiful personalized digital wishes and share special moments with the people you care about.';
const titleize = (t) => (t ? `${t} · GiftOfy` : DEFAULT_TITLE);

/** Mirrors each page component's own useSeo({...}) call. If you change one, change the other. */
function seoFor(pathname) {
  if (pathname === '/') return { title: DEFAULT_TITLE, description: DEFAULT_DESC, social: DEFAULT_SOCIAL_DESC, noindex: false };
  if (pathname === '/create' || pathname.startsWith('/create/')) {
    const d = 'Create a personalized digital wish in under two minutes and share it with someone special.';
    return { title: titleize('Create a Wish'), description: d, social: d, noindex: false };
  }
  if (pathname.startsWith('/wish/')) return { title: titleize('A special wish for you'), description: DEFAULT_DESC, social: DEFAULT_SOCIAL_DESC, noindex: true };
  if (pathname.startsWith('/reply/')) return { title: titleize('A reply to your wish'), description: DEFAULT_DESC, social: DEFAULT_SOCIAL_DESC, noindex: true };
  if (pathname === '/admin' || pathname.startsWith('/admin/')) return { title: titleize('Admin'), description: DEFAULT_DESC, social: DEFAULT_SOCIAL_DESC, noindex: true };

  const infoKey = pathname.slice(1);
  if (PAGES[infoKey]) {
    const [title, text] = PAGES[infoKey];
    return { title: titleize(title), description: text, social: text, noindex: false };
  }

  const seoPage = SEO_PAGES.find((p) => `/${p.slug}` === pathname);
  if (seoPage) {
    const d = `${seoPage.intro.slice(0, 140)}…`;
    return { title: titleize(seoPage.h1), description: d, social: d, noindex: false };
  }

  return { title: titleize('Not found'), description: DEFAULT_DESC, social: DEFAULT_SOCIAL_DESC, noindex: true };
}

function applySeo(html, seo, url) {
  const robots = seo.noindex ? 'noindex,nofollow' : 'index,follow,max-image-preview:large';
  const esc = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;');
  return html
    .replace(/<title>.*?<\/title>/s, `<title>${esc(seo.title)}</title>`)
    .replace(/<meta name="description" content=".*?">/s, `<meta name="description" content="${esc(seo.description)}">`)
    .replace(/<meta name="robots" content=".*?">/s, `<meta name="robots" content="${robots}">`)
    .replace(/<link rel="canonical" href=".*?">/s, `<link rel="canonical" href="${esc(url)}">`)
    .replace(/<meta property="og:url" content=".*?">/s, `<meta property="og:url" content="${esc(url)}">`)
    .replace(/<meta property="og:title" content=".*?">/s, `<meta property="og:title" content="${esc(seo.title)}">`)
    .replace(/<meta property="og:description" content=".*?">/s, `<meta property="og:description" content="${esc(seo.social)}">`)
    .replace(/<meta name="twitter:title" content=".*?">/s, `<meta name="twitter:title" content="${esc(seo.title)}">`)
    .replace(/<meta name="twitter:description" content=".*?">/s, `<meta name="twitter:description" content="${esc(seo.social)}">`);
  // og:image/twitter:image/twitter:card and the AdSense script and JSON-LD are untouched —
  // they're sitewide-static in index.html and this never removes or duplicates them.
}

export default async function middleware(request) {
  const url = new URL(request.url);
  // Canonicalize trailing slashes here, not in vercel.json: this middleware runs before Vercel's
  // "redirects" config and returns a terminal response for every matched path, so a redirect rule
  // in vercel.json would never actually be reached. "/" itself is never affected. The query string
  // is preserved; the redirect target then goes through the exact same seoFor()/applySeo() below on
  // the follow-up request, so a private path like /wish/:id/ still ends up noindex,nofollow once
  // redirected to its canonical /wish/:id form -- this only removes the trailing slash, nothing else.
  if (url.pathname.length > 1 && url.pathname.endsWith('/')) {
    return Response.redirect(new URL(url.pathname.slice(0, -1) + url.search, url.origin), 308);
  }
  const origin = await fetch(new URL('/index.html', url.origin));
  if (!origin.ok) return origin; // fall back to whatever the platform would otherwise serve
  const html = applySeo(await origin.text(), seoFor(url.pathname), `${SITE}${url.pathname}`);
  return new Response(html, { status: 200, headers: { 'content-type': 'text/html; charset=utf-8' } });
}
