import { render, screen, fireEvent, within, waitFor, cleanup, act } from '@testing-library/react';
import { hydrateRoot } from 'react-dom/client';
import { MemoryRouter } from 'react-router-dom';
import { StaticRouter } from 'react-router-dom/server';
import { renderToString } from 'react-dom/server';
import { afterEach, beforeAll, describe, expect, it, vi } from 'vitest';
import App from '../App.jsx';
import ContentPage from './ContentPage.jsx';
import { PAGE_META, META_BY_PATH, byGroup } from '../data/pageMeta.js';
import { OCCASION_BODIES } from '../data/content/occasions.js';
import { RECIPIENT_BODIES } from '../data/content/recipients.js';
import { GUIDE_BODIES } from '../data/content/guides.js';
import { CORE_BODIES } from '../data/corePages.js';
import { TEMPLATES } from '../data/templates.js';
import { seoForPath } from '../seo/routes.js';

vi.mock('../lib/supabase.js', async () => import('../test/fakeSupabase.js'));
beforeAll(() => { window.scrollTo = () => {}; });
afterEach(() => { cleanup(); vi.unstubAllEnvs(); });
const at = (p) => render(<MemoryRouter initialEntries={[p]}><App /></MemoryRouter>);
const metaContent = (sel) => document.head.querySelector(sel)?.getAttribute('content');

describe('every public page', () => {
  it('renders exactly one H1, breadcrumbs (except home), valid JSON-LD, and client SEO that matches the server SEO', async () => {
    for (const m of PAGE_META) {
      const { container, unmount } = at(m.path);
      await screen.findByRole('heading', { level: 1 });
      expect(screen.getAllByRole('heading', { level: 1 }), m.path).toHaveLength(1);
      if (!['/', '/create'].includes(m.path)) expect(screen.getByRole('navigation', { name: 'Breadcrumb' }), m.path).toBeTruthy();
      for (const s of container.querySelectorAll('script[type="application/ld+json"]')) expect(() => JSON.parse(s.textContent), m.path).not.toThrow();
      const seo = seoForPath(m.path);
      await waitFor(() => expect(document.title, m.path).toBe(seo.title));
      expect(metaContent('meta[name="description"]'), m.path).toBe(seo.description);
      expect(metaContent('meta[name="robots"]'), m.path).toBe(seo.robots);
      expect(document.head.querySelector('link[rel="canonical"]').getAttribute('href'), m.path).toMatch(new RegExp(`${m.path === '/' ? '/' : m.path}$`));
      unmount();
    }
  }, 120000);

  it('shows BreadcrumbList + Article for content pages and FAQPage when the page has FAQs', async () => {
    const { container } = at('/birthday-wishes');
    await screen.findByRole('heading', { level: 1, name: /Birthday Wishes/ });
    const types = [...container.querySelectorAll('script[type="application/ld+json"]')].map((s) => JSON.parse(s.textContent)['@type']);
    expect(types).toEqual(expect.arrayContaining(['BreadcrumbList', 'Article', 'FAQPage']));
  });

  it('the About page names the real operator and the honest limits of the product', async () => {
    at('/about');
    await screen.findByRole('heading', { level: 1, name: 'About GiftOfy' });
    expect(document.body.textContent).toContain('Syyed Muhummad Irshad');
    expect(document.body.textContent).toMatch(/does not sell or deliver physical gifts/);
  });
});

describe('hubs and navigation', () => {
  it('/wishes links to every occasion and recipient page; /guides to every guide', async () => {
    at('/wishes');
    await screen.findByRole('heading', { level: 1, name: /Every Occasion/ });
    const main = within(screen.getByRole('main'));
    for (const m of [...byGroup('occasion'), ...byGroup('recipient')]) expect(main.getByRole('link', { name: new RegExp(m.h1.replace(/[’]/g, '.')) }).getAttribute('href'), m.path).toBe(m.path);
    cleanup();
    at('/guides');
    await screen.findByRole('heading', { level: 1, name: /Guides/ });
    const g = within(screen.getByRole('main'));
    for (const m of byGroup('guide')) expect(g.getByRole('link', { name: new RegExp(m.h1) }).getAttribute('href')).toBe(m.path);
  });
  it('footer and header links all point at real routes', async () => {
    at('/');
    await screen.findByRole('heading', { level: 1 });
    const hrefs = [...document.querySelectorAll('header a[href^="/"], footer a[href^="/"]')].map((a) => a.getAttribute('href')).filter((h) => h.split('#')[0] !== '' || h === '/');
    for (const h of hrefs) expect(META_BY_PATH[h.split('#')[0]] || ['/', '/create'].includes(h), h).toBeTruthy();
    expect(hrefs.length).toBeGreaterThan(25);
  });
  it('unknown URLs show the not-found page with helpful links, marked noindex', async () => {
    at('/this-page-does-not-exist');
    expect(await screen.findByRole('heading', { name: /could not be found/ })).toBeTruthy();
    expect(screen.getByRole('link', { name: 'Browse wishes' }).getAttribute('href')).toBe('/wishes');
    await waitFor(() => expect(metaContent('meta[name="robots"]')).toBe('noindex,nofollow'));
  });
});

describe('sample messages: copy and "Use in a wish"', () => {
  it('Copy writes the message to the clipboard', async () => {
    const writeText = vi.fn().mockResolvedValue();
    Object.defineProperty(navigator, 'clipboard', { value: { writeText }, configurable: true });
    at('/thank-you-messages');
    const [btn] = await screen.findAllByRole('button', { name: 'Copy this message' });
    fireEvent.click(btn);
    await waitFor(() => expect(writeText).toHaveBeenCalledOnce());
    expect(typeof writeText.mock.calls[0][0]).toBe('string');
    expect(btn.textContent).toBe('Copied ✓');
  });
  it('"Use in a wish" opens the create wizard for that occasion with the message prefilled, editable and publishable', async () => {
    at('/birthday-wishes');
    const [link] = await screen.findAllByRole('link', { name: 'Use this message in a wish' });
    const msg = decodeURIComponent(link.getAttribute('href').split('?m=')[1]);
    expect(link.getAttribute('href')).toMatch(/^\/create\/birthday\?m=/);
    fireEvent.click(link);
    fireEvent.click(await screen.findByRole('button', { name: 'Next' }));
    expect(screen.getByLabelText(/Your message/).value).toBe(msg);
    expect(document.head.querySelector('link[rel="canonical"]').getAttribute('href')).toMatch(/\/create$/);
  });
  it('an oversized or hostile ?m= value is capped at 500 characters and rendered as plain text', async () => {
    at(`/create/birthday?m=${encodeURIComponent('<img src=x onerror=alert(1)>' + 'a'.repeat(900))}`);
    fireEvent.click(await screen.findByRole('button', { name: 'Next' }));
    const v = screen.getByLabelText(/Your message/).value;
    expect(v.length).toBe(500);
    expect(document.querySelector('img[src="x"]')).toBeNull();
  });
});

describe('create wizard regressions', () => {
  it('Anniversary preview describes the real opening object instead of "undefined"', async () => {
    at('/create/anniversary');
    fireEvent.click(await screen.findByRole('button', { name: 'Next' }));
    fireEvent.change(screen.getByLabelText(/Recipient name/), { target: { value: 'Sara' } });
    fireEvent.click(screen.getByRole('button', { name: 'Preview Wish' }));
    const note = (await screen.findByText(/wishes open with a/)).closest('p');
    expect(note.textContent).toMatch(/pair of hearts/);
    expect(note.textContent).not.toMatch(/undefined/);
  });
  it('the wizard has exactly one H1 on every step', async () => {
    at('/create');
    await screen.findByRole('heading', { level: 1, name: /What are we celebrating/ });
    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1);
  });
});

describe('GiftOfy panel only describes designs that exist', () => {
  it('states the real number of free designs for the occasion', async () => {
    for (const [path, occ] of [['/wedding-wishes', 'wedding'], ['/eid-wishes', 'eid'], ['/mothers-day-wishes', 'mothers']]) {
      const { unmount } = at(path);
      const panel = (await screen.findByRole('heading', { name: 'Send it as a GiftOfy wish' })).closest('section');
      const n = TEMPLATES.filter((t) => t.occ === occ && !t.premium).length;
      expect(panel.textContent, path).toContain(`GiftOfy has ${n} free`);
      for (const t of TEMPLATES.filter((x) => x.occ === occ && !x.premium)) expect(panel.textContent, path).toContain(t.title);
      unmount();
    }
  });
  it('Christmas page admits there is no dedicated Christmas design', async () => {
    at('/christmas-wishes');
    const panel = (await screen.findByRole('heading', { name: 'Send it as a GiftOfy wish' })).closest('section');
    expect(panel.textContent).toMatch(/does not have a dedicated Christmas occasion yet/);
  });
});

describe('ad-ready layout (no ads by default)', () => {
  it('renders no ad container or ad script on any content page unless explicitly enabled', async () => {
    const { container } = at('/birthday-wishes');
    await screen.findByRole('heading', { level: 1 });
    expect(container.querySelector('.adslot, ins.adsbygoogle')).toBeNull();
    expect(document.querySelectorAll('script[src*="adsbygoogle"], script[src*="pagead"]')).toHaveLength(0);
  });
  it('when enabled with a slot id it renders one labelled unit on content pages, never in the create wizard', async () => {
    vi.stubEnv('VITE_ADSENSE_ENABLED', 'true');
    vi.stubEnv('VITE_ADSENSE_SLOT_CONTENT', '1234567890');
    vi.resetModules();
    const { default: AdSlot } = await import('../components/AdSlot.jsx');
    const { container } = render(<AdSlot />);
    const ins = container.querySelector('ins.adsbygoogle');
    expect(ins.getAttribute('data-ad-client')).toBe('ca-pub-6145547842489065');
    expect(ins.getAttribute('data-ad-slot')).toBe('1234567890');
    expect(screen.getByLabelText('Advertisement')).toBeTruthy();
    cleanup();
    vi.stubEnv('VITE_ADSENSE_SLOT_CONTENT', '');
    vi.resetModules();
    const { default: Empty } = await import('../components/AdSlot.jsx');
    expect(render(<Empty />).container.innerHTML).toBe('');
  });
});

describe('server rendering safety (used by scripts/prerender.mjs)', () => {
  it('renders a page of every kind to static HTML without touching window or throwing', () => {
    const cases = [
      ['/birthday-wishes', OCCASION_BODIES], ['/wishes-for-mother', RECIPIENT_BODIES],
      ['/guides/how-to-write-a-heartfelt-message', GUIDE_BODIES], ['/privacy', CORE_BODIES], ['/faq', CORE_BODIES],
    ];
    for (const [p, bodies] of cases) {
      const meta = META_BY_PATH[p];
      const html = renderToString(<StaticRouter location={p}><ContentPage meta={meta} body={bodies[meta.key]} /></StaticRouter>);
      expect(html, p).toContain('<h1');
      expect(html, p).toContain(meta.h1.slice(0, 20));
      expect(html, p).toContain('application/ld+json');
    }
  });
});

describe('hydration of pre-rendered pages', () => {
  it('server HTML hydrates with no mismatch warnings for every kind of public page', async () => {
    for (const p of ['/', '/create', '/wishes', '/birthday-wishes', '/christmas-wishes', '/wishes-for-mother', '/guides/digital-gifts-vs-greeting-cards', '/faq', '/privacy']) {
      const warm = at(p); await screen.findByRole('heading', { level: 1 }); warm.unmount(); // loads the lazy page chunk
      const html = renderToString(<StaticRouter location={p}><App /></StaticRouter>);
      expect(html, p).toContain('<h1');
      const el = document.createElement('div'); el.innerHTML = html; document.body.appendChild(el);
      const spy = vi.spyOn(console, 'error').mockImplementation(() => {});
      let root; await act(async () => { root = hydrateRoot(el, <MemoryRouter initialEntries={[p]}><App /></MemoryRouter>); });
      await waitFor(() => expect(el.querySelector('h1')).toBeTruthy());
      const bad = spy.mock.calls.map((c) => String(c[0])).filter((m) => /hydrat|did not match|Expected server HTML/i.test(m));
      spy.mockRestore();
      expect(bad, p).toEqual([]);
      act(() => root.unmount()); el.remove();
    }
  }, 60000);
});

describe('owner and contact details', () => {
  it('config holds the confirmed owner name and official email', async () => {
    const cfg = await import('../data/siteConfig.js');
    expect(cfg.OWNER_NAME).toBe('Syyed Muhummad Irshad');
    expect(cfg.CONTACT_EMAIL).toBe('career@giftofy.vercel.app');
  });
  it('the owner name is spelled one way everywhere in the shipped source (no stale spellings)', async () => {
    const fs = await import('node:fs'); const path = await import('node:path');
    const walk = (d) => fs.readdirSync(d, { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? walk(path.join(d, e.name)) : [path.join(d, e.name)]));
    const files = [...walk('src'), ...walk('public').filter((f) => /\.(html|txt|xml|js)$/.test(f)), 'index.html', 'middleware.js', 'README.md'].filter((f) => !/ContentPages\.test|App\.test/.test(f));
    for (const f of files) expect(fs.readFileSync(f, 'utf8'), f).not.toMatch(/Muhamamd|Syyed Muhammad|Syyed Irshad/);
  });
  it('Contact page shows the email as a mailto link AND keeps WhatsApp', async () => {
    at('/contact');
    await screen.findByRole('heading', { level: 1, name: 'Contact GiftOfy' });
    const main = within(screen.getByRole('main'));
    const mail = main.getAllByRole('link', { name: 'career@giftofy.vercel.app' });
    expect(mail.length).toBeGreaterThanOrEqual(2); // button + sentence
    for (const a of mail) expect(a.getAttribute('href')).toBe('mailto:career@giftofy.vercel.app');
    expect(main.getByRole('link', { name: /Message us on WhatsApp/ }).getAttribute('href')).toBe('https://wa.me/923218100537');
  });
  it('the footer shows the email on every page, next to the unchanged WhatsApp link', async () => {
    at('/faq');
    await screen.findByRole('heading', { level: 1 });
    const footer = within(document.querySelector('footer'));
    expect(footer.getByRole('link', { name: 'career@giftofy.vercel.app' }).getAttribute('href')).toBe('mailto:career@giftofy.vercel.app');
    expect(footer.getByRole('link', { name: /\+923218100537/ }).getAttribute('href')).toBe('https://wa.me/923218100537');
  });
  it('Privacy, Terms and About name the operator and give the official email', async () => {
    for (const p of ['/privacy', '/terms', '/about']) {
      const { unmount } = at(p);
      await screen.findByRole('heading', { level: 1 });
      const main = screen.getByRole('main');
      expect(main.textContent, p).toContain('Syyed Muhummad Irshad');
      expect(within(main).getAllByRole('link', { name: 'career@giftofy.vercel.app' })[0].getAttribute('href'), p).toBe('mailto:career@giftofy.vercel.app');
      unmount();
    }
  });
});

describe('policy statements match what the code can actually do', () => {
  const policyText = async () => {
    const { CORE_BODIES } = await import('../data/corePages.js');
    return Object.entries(CORE_BODIES).map(([k, b]) => [k, JSON.stringify([b.lead, b.sections, b.faqs])]);
  };
  it('make no response-time, guaranteed-removal or permanent-deletion promises the product cannot keep', async () => {
    for (const [k, t] of await policyText()) {
      expect(t, k).not.toMatch(/within (\d+|a|an|one|two|three|\w+) (business )?(hours?|days?|weeks?)|replies can take a few days|we will delete the record|we delete the record|we make it unavailable|and we will remove it\b|include the word|look at them first|we guarantee|guaranteed (removal|deletion|response|reply)/i);
    }
  });
  it('Privacy explains soft deletion honestly: no self-service deletion, replies cannot be removed with admin tools, erasure is manual', async () => {
    const t = (await policyText()).find(([k]) => k === 'privacy')[1];
    expect(t).toMatch(/no self-service way to delete a wish or a reply/);
    expect(t).toMatch(/hide a wish or mark it as deleted/);
    expect(t).toMatch(/cannot hide or delete replies/);
    expect(t).toMatch(/done manually by the operator directly in the database/);
    expect(t).toMatch(/cannot promise a response time/);
  });
  it('Contact page makes no response-time promise', async () => {
    const t = (await policyText()).find(([k]) => k === 'contact')[1];
    expect(t).toMatch(/cannot promise a response time/);
    expect(t).toMatch(/emergency services/);
  });
});
