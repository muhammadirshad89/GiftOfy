// Technical-SEO invariants: server-side route resolution, sitemap/robots/ads.txt, verification files,
// and that no advertising-network scripts have crept back in.
import fs from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import { seoForPath } from './routes.js';
import { buildSitemapXml } from './sitemap.js';
import { PAGE_META } from '../data/pageMeta.js';
import { breadcrumbLd, faqLd, plain } from './jsonld.js';

const root = process.cwd();
const read = (f) => fs.readFileSync(path.join(root, f), 'utf8');
const walk = (d) => fs.readdirSync(path.join(root, d), { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? walk(`${d}/${e.name}`) : [`${d}/${e.name}`]));

describe('seoForPath', () => {
  it('every registry page is indexable with a self canonical', () => {
    for (const m of PAGE_META) {
      const s = seoForPath(m.path);
      expect(s.status, m.path).toBe(200);
      expect(s.robots, m.path).toMatch(/^index,follow/);
      expect(s.canonicalPath, m.path).toBe(m.path);
      expect(s.prerendered, m.path).toBe(true);
    }
  });
  it('/create/:occasion consolidates to /create; wish, reply and admin are noindex', () => {
    expect(seoForPath('/create/birthday')).toMatchObject({ canonicalPath: '/create', status: 200 });
    for (const p of ['/wish/Abc12345', '/reply/sometoken', '/admin', '/admin/login']) expect(seoForPath(p), p).toMatchObject({ robots: 'noindex,nofollow', status: 200, prerendered: false });
  });
  it('unknown paths are real 404s and noindex', () => {
    for (const p of ['/nope', '/guides/not-a-guide', '/wish', '/wish/a/b', '/birthday-wishes/extra', '/BIRTHDAY-WISHES']) expect(seoForPath(p), p).toMatchObject({ status: 404, robots: 'noindex,nofollow' });
  });
});

describe('sitemap, robots, ads.txt, verification files', () => {
  it('public/sitemap.xml is exactly what the registry generates (run `npm run seo:sitemap` if this fails)', () => {
    expect(read('public/sitemap.xml')).toBe(buildSitemapXml());
  });
  it('sitemap lists only canonical absolute URLs, no duplicates, nothing private', () => {
    const locs = [...buildSitemapXml().matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1]);
    expect(locs.length).toBe(PAGE_META.length);
    expect(new Set(locs).size).toBe(locs.length);
    for (const l of locs) { expect(l).toMatch(/^https:\/\/giftofy\.vercel\.app(\/[a-z0-9\-/]*)?$/); expect(l).not.toMatch(/\/(wish|reply|admin)(\/|$)/); }
    expect(locs).toContain('https://giftofy.vercel.app/');
  });
  it('robots.txt allows the site, blocks only /admin and points at the sitemap (wish pages stay crawlable so noindex is seen)', () => {
    const r = read('public/robots.txt');
    expect(r).toMatch(/User-agent: \*\s+Allow: \//);
    expect(r).toMatch(/Disallow: \/admin\b/);
    expect(r).not.toMatch(/Disallow: \/(wish|reply|assets|_pre)\b/);
    expect(r).toContain('Sitemap: https://giftofy.vercel.app/sitemap.xml');
  });
  it('ads.txt still holds the existing AdSense publisher line, unchanged', () => {
    expect(read('public/ads.txt').trim()).toBe('google.com, pub-6145547842489065, DIRECT, f08c47fec0942fa0');
  });
  it('Search Console verification (HTML file and meta tag) is preserved', () => {
    expect(read('public/google0da64d656286dcbb.html')).toContain('google-site-verification: google0da64d656286dcbb.html');
    expect(read('index.html')).toContain('name="google-site-verification" content="QGBRd5rYqLlhXfRRDuaoctaLVvPINUQSEeaeFGFxtiE"');
  });
});

describe('advertising and third-party scripts', () => {
  const NETWORKS = /monetag|adcash|adsterra|propeller|popads|popcash|exoclick|clickadu|hilltopads|richpush|onclkds|5gvci|3nbf4|alwingulla|ad-maven|admaven/i;
  it('no unrelated ad-network references anywhere in source, public files or config', () => {
    const files = [...walk('src'), ...walk('public').filter((f) => !f.endsWith('.png')), 'index.html', 'middleware.js', 'vercel.json', ...walk('scripts')].filter((f) => !/\.test\./.test(f));
    for (const f of files) expect(read(f), f).not.toMatch(NETWORKS);
  });
  it('index.html loads exactly one AdSense loader (existing publisher id) and the Chatzy widget script', () => {
    const html = read('index.html');
    expect(html.match(/pagead2\.googlesyndication\.com\/pagead\/js\/adsbygoogle\.js\?client=ca-pub-6145547842489065/g)).toHaveLength(1);
    expect(html.match(/<script[^>]*class="chatzy_widget_script"/g)).toHaveLength(1);
    // Exact original integration (commit f4911b6): stylesheet AND script, byte for byte.
    expect(html).toContain('<link rel="stylesheet" href="https://chatzy-kb-store.s3.amazonaws.com/icons/5ab07987-b5db-477c-82ff-1287e0883acb"/>');
    expect(html).toContain('<script src="https://chatzy-kb-store.s3.amazonaws.com/icons/56706cc4-b3ba-4eba-9610-f2fb07008a5c" id="799ad3fb-adac-4333-8225-958d20808016" class="chatzy_widget_script" defer></script>');
    const srcs = [...html.matchAll(/<script[^>]*\ssrc="([^"]+)"/g)].map((m) => new URL(m[1], 'https://x.test').hostname);
    expect(srcs.sort()).toEqual(['chatzy-kb-store.s3.amazonaws.com', 'pagead2.googlesyndication.com', 'x.test']);
  });
  it('service-worker stubs are neutral and unregister themselves', () => {
    for (const f of ['public/sw.js', 'public/sww.js']) { const s = read(f); expect(s).toContain('registration.unregister()'); expect(s).not.toMatch(/importScripts|fetch\(/); }
  });
  it('no secrets: .env is untracked/ignored and .env.example holds placeholders only', () => {
    expect(read('.gitignore')).toMatch(/^\.env$/m);
    const ex = read('.env.example');
    expect(ex).toContain('your-anon-public-key');
    expect(ex).not.toMatch(/eyJ[A-Za-z0-9_-]{20,}|service_role\s*=\s*\S{10,}/);
  });
});

describe('structured data builders', () => {
  it('BreadcrumbList uses absolute URLs and 1-based positions; FAQ text has no markup', () => {
    const b = breadcrumbLd([['Home', '/'], ['Guides', '/guides']]);
    expect(b.itemListElement.map((i) => i.position)).toEqual([1, 2]);
    expect(b.itemListElement[1].item).toBe('https://giftofy.vercel.app/guides');
    expect(faqLd([['Q?', 'See [the FAQ](/faq) for **more**.']]).mainEntity[0].acceptedAnswer.text).toBe('See the FAQ for more.');
    expect(plain('[a](/b) **c**')).toBe('a c');
  });
});
