// Validates the actual logic Vercel Edge Middleware will run — not a live-edge test (that needs a
// real Vercel deployment), but proves seoFor()/applySeo() produce correct output for every route
// this project has, using a stubbed fetch() standing in for the platform fetching /index.html.
import { beforeEach, describe, expect, it, vi } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import middleware, { config } from './middleware.js';

const TEMPLATE = fs.readFileSync(path.join(process.cwd(), 'index.html'), 'utf8');

beforeEach(() => {
  globalThis.fetch = vi.fn(async () => new Response(TEMPLATE, { status: 200 }));
});

async function run(path) {
  const res = await middleware(new Request(`https://giftofy.vercel.app${path}`));
  return res.text();
}
const tag = (html, name) => html.match(new RegExp(`<meta name="${name}" content="(.*?)">`))?.[1];
const robots = (html) => tag(html, 'robots');
const title = (html) => html.match(/<title>(.*?)<\/title>/)?.[1];
const canonical = (html) => html.match(/<link rel="canonical" href="(.*?)">/)?.[1];

describe('middleware: server-delivered SEO per route', () => {
  it('homepage: index,follow, live title, correct canonical', async () => {
    const html = await run('/');
    expect(robots(html)).toBe('index,follow,max-image-preview:large');
    expect(title(html)).toBe('GiftOfy – Create Digital Wishes &amp; Share Special Moments');
    expect(canonical(html)).toBe('https://giftofy.vercel.app/');
  });
  it('every SEO landing page is index,follow with its own title and canonical', async () => {
    for (const slug of ['birthday-wishes', 'anniversary-wishes', 'wedding-wishes', 'engagement-wishes', 'eid-wishes', 'valentine-wishes', 'congratulations-messages', 'thank-you-messages', 'get-well-soon-wishes', 'friendship-messages', 'miss-you-messages']) {
      const html = await run(`/${slug}`);
      expect(robots(html), slug).toBe('index,follow,max-image-preview:large');
      expect(canonical(html), slug).toBe(`https://giftofy.vercel.app/${slug}`);
      expect(title(html), slug).not.toContain('Not found');
    }
  });
  it('About/Contact/Privacy/Terms are index,follow with their real titles', async () => {
    for (const [slug, expectTitle] of [['about', 'About GiftOfy'], ['contact', 'Contact'], ['privacy', 'Privacy'], ['terms', 'Terms']]) {
      const html = await run(`/${slug}`);
      expect(robots(html), slug).toBe('index,follow,max-image-preview:large');
      expect(title(html), slug).toContain(expectTitle);
    }
  });
  it('/wish/:id is noindex,nofollow in the server-delivered HTML — before any JS runs', async () => {
    const html = await run('/wish/Ab3dE6gH');
    expect(robots(html)).toBe('noindex,nofollow');
  });
  it('/reply/:token is noindex,nofollow in the server-delivered HTML', async () => {
    const html = await run('/reply/rp_' + '0'.repeat(40));
    expect(robots(html)).toBe('noindex,nofollow');
  });
  it('/admin and /admin/login are noindex,nofollow', async () => {
    expect(robots(await run('/admin'))).toBe('noindex,nofollow');
    expect(robots(await run('/admin/login'))).toBe('noindex,nofollow');
  });
  it('an unknown path falls back to noindex,nofollow (safe default)', async () => {
    expect(robots(await run('/this-page-does-not-exist'))).toBe('noindex,nofollow');
  });
  it('/create is index,follow', async () => {
    expect(robots(await run('/create'))).toBe('index,follow,max-image-preview:large');
  });
  it('trailing slash: a public page redirects (308) to the canonical non-slash URL', async () => {
    const res = await middleware(new Request('https://giftofy.vercel.app/birthday-wishes/'));
    expect(res.status).toBe(308);
    expect(res.headers.get('location')).toBe('https://giftofy.vercel.app/birthday-wishes');
  });
  it('trailing slash: redirect preserves the query string', async () => {
    const res = await middleware(new Request('https://giftofy.vercel.app/about/?ref=whatsapp'));
    expect(res.headers.get('location')).toBe('https://giftofy.vercel.app/about?ref=whatsapp');
  });
  it('trailing slash: /create/ and / itself behave correctly (no redirect loop at root)', async () => {
    expect((await middleware(new Request('https://giftofy.vercel.app/create/'))).status).toBe(308);
    expect((await middleware(new Request('https://giftofy.vercel.app/create/'))).headers.get('location')).toBe('https://giftofy.vercel.app/create');
    const rootRes = await middleware(new Request('https://giftofy.vercel.app/'));
    expect(rootRes.status).toBe(200); // never redirected
  });
  it('trailing slash: the canonical destination the redirect points to is itself still index,follow', async () => {
    const html = await run('/birthday-wishes'); // the exact URL /birthday-wishes/ redirects to
    expect(robots(html)).toBe('index,follow,max-image-preview:large');
  });
  it('trailing slash: private routes also redirect, and their canonical destination stays noindex', async () => {
    for (const [slashed, clean] of [['/wish/test123/', '/wish/test123'], ['/reply/testtoken/', '/reply/testtoken'], ['/admin/', '/admin']]) {
      const res = await middleware(new Request(`https://giftofy.vercel.app${slashed}`));
      expect(res.status, slashed).toBe(308);
      expect(res.headers.get('location'), slashed).toBe(`https://giftofy.vercel.app${clean}`);
      expect(robots(await run(clean)), clean).toBe('noindex,nofollow'); // where it redirects TO
    }
  });
  it('trailing slash: an unknown route still redirects, landing on the safe noindex fallback', async () => {
    const res = await middleware(new Request('https://giftofy.vercel.app/nonexistent-page/'));
    expect(res.status).toBe(308);
    expect(res.headers.get('location')).toBe('https://giftofy.vercel.app/nonexistent-page');
    expect(robots(await run('/nonexistent-page'))).toBe('noindex,nofollow');
  });
  it('never touches og:image, twitter:image, the AdSense script, or JSON-LD', async () => {
    const html = await run('/birthday-wishes');
    expect(html).toContain('https://giftofy.vercel.app/og-default.png');
    expect((html.match(/ca-pub-6145547842489065/g) || []).length).toBe(1); // present, exactly once
    expect(html).toContain('"@type":"Organization"');
    expect(html).toContain('"@type":"WebSite"');
  });
});

describe('P1: new-year-wishes and graduation-wishes — server-delivered SEO', () => {
  it('both are index,follow with their own title/canonical in the server-delivered HTML', async () => {
    for (const slug of ['new-year-wishes', 'graduation-wishes']) {
      const html = await run(`/${slug}`);
      expect(robots(html), slug).toBe('index,follow,max-image-preview:large');
      expect(canonical(html), slug).toBe(`https://giftofy.vercel.app/${slug}`);
      expect(title(html), slug).not.toContain('Not found');
    }
  });
  it('trailing slash redirects correctly for both new pages, preserving the P0 fix', async () => {
    for (const slug of ['new-year-wishes', 'graduation-wishes']) {
      const res = await middleware(new Request(`https://giftofy.vercel.app/${slug}/`));
      expect(res.status, slug).toBe(308);
      expect(res.headers.get('location'), slug).toBe(`https://giftofy.vercel.app/${slug}`);
    }
  });
});

describe('middleware: status codes, matcher and pre-rendered pages', () => {
  const matches = (p) => new RegExp(`^/${config.matcher.slice(2, -1)}$`).test(p);
  const pre = (body = '<div id="root" data-prerendered="1"><h1>Pre</h1></div>') => body;

  it('unknown URLs return a real HTTP 404 (not a soft 404) and stay noindex', async () => {
    const res = await middleware(new Request('https://giftofy.vercel.app/definitely-not-a-page'));
    expect(res.status).toBe(404);
    expect(robots(await res.text())).toBe('noindex,nofollow');
  });
  it('real pages, wish, reply, admin and create/:occasion return 200', async () => {
    for (const p of ['/', '/birthday-wishes', '/guides/how-to-write-a-heartfelt-message', '/wish/Abc12345', '/reply/tok', '/admin', '/create/eid']) {
      expect((await middleware(new Request(`https://giftofy.vercel.app${p}`))).status, p).toBe(200);
    }
  });
  it('/create/:occasion canonicalizes to /create', async () => {
    expect(canonical(await run('/create/birthday'))).toBe('https://giftofy.vercel.app/create');
  });
  it('the matcher leaves static files alone (Search Console file, ads.txt, robots, sitemap, llms.txt, service-worker stubs, assets, /_pre)', () => {
    for (const p of ['/google0da64d656286dcbb.html', '/ads.txt', '/robots.txt', '/sitemap.xml', '/llms.txt', '/sw.js', '/sww.js', '/favicon.svg', '/og-default.png', '/logo-512.png', '/assets/index-abc.js', '/_pre/birthday-wishes.html', '/index.html']) {
      expect(matches(p), p).toBe(false);
    }
  });
  it('the matcher still covers every page, dynamic route and unknown path', () => {
    for (const p of ['/', '/birthday-wishes', '/guides/how-to-share-a-digital-greeting', '/wish/Abc12345', '/reply/tok', '/admin', '/admin/login', '/create/eid', '/nope']) expect(matches(p), p).toBe(true);
  });
  it('serves the pre-rendered body for public pages and applies the route SEO to it', async () => {
    globalThis.fetch = vi.fn(async (u) => (String(u).includes('/_pre/birthday-wishes.html')
      ? new Response(TEMPLATE.replace('<div id="root"></div>', pre()), { status: 200, headers: { 'content-type': 'text/html; charset=utf-8' } })
      : new Response(TEMPLATE)));
    const html = await run('/birthday-wishes');
    expect(html).toContain('<h1>Pre</h1>');
    expect(title(html)).toBe('Birthday Wishes &amp; Messages for Any Age · GiftOfy');
    expect(canonical(html)).toBe('https://giftofy.vercel.app/birthday-wishes');
    expect(html).toContain('<meta property="og:type" content="article">');
    expect(globalThis.fetch.mock.calls.map((c) => String(c[0]))).toContain('https://giftofy.vercel.app/_pre/birthday-wishes.html');
  });
  it('the homepage uses /_pre/index.html', async () => {
    globalThis.fetch = vi.fn(async (u) => new Response(TEMPLATE.replace('<div id="root"></div>', pre()), { status: 200, headers: { 'content-type': 'text/html' } }));
    await run('/');
    expect(String(globalThis.fetch.mock.calls[0][0])).toBe('https://giftofy.vercel.app/_pre/index.html');
  });
  it('falls back to the plain SPA shell when the pre-rendered file is missing, so a build problem cannot take a page down', async () => {
    // Vercel would answer a missing /_pre file with the SPA shell (200, no data-prerendered marker).
    const html = await run('/eid-wishes');
    expect(html).toContain('<div id="root"></div>');
    expect(title(html)).toContain('Eid Mubarak');
    expect(robots(html)).toBe('index,follow,max-image-preview:large');
  });
  it('falls back safely if fetching the pre-rendered file throws', async () => {
    let n = 0;
    globalThis.fetch = vi.fn(async () => { if (n++ === 0) throw new Error('boom'); return new Response(TEMPLATE); });
    expect(title(await run('/faq'))).toContain('FAQ');
  });
  it('never touches wish/reply/admin pages with pre-rendered content', async () => {
    await run('/wish/Abc12345');
    expect(globalThis.fetch.mock.calls.map((c) => String(c[0])).some((u) => u.includes('/_pre/'))).toBe(false);
  });
});
