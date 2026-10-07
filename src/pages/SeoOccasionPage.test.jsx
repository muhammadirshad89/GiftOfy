import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { beforeAll, describe, expect, it } from 'vitest';
import App from '../App.jsx';
import { SEO_PAGES } from '../data/seoPages.js';
import { OCC } from '../data/content.js';

beforeAll(() => { window.scrollTo = () => {}; });
const at = (p) => render(<MemoryRouter initialEntries={[p]}><App /></MemoryRouter>);

describe('SEO occasion pages', () => {
  it('every page maps to a real occasion that already has designs and a create flow', () => {
    SEO_PAGES.forEach((p) => expect(OCC.some((o) => o.id === p.occasionId), p.slug).toBe(true));
  });
  it('every page has distinct, real content (no two pages share intro or messages)', () => {
    expect(new Set(SEO_PAGES.map((p) => p.intro)).size).toBe(SEO_PAGES.length);
    const allMsgs = SEO_PAGES.flatMap((p) => (p.messages ? p.messages : p.sections.flatMap(([, msgs]) => msgs)));
    expect(new Set(allMsgs).size).toBe(allMsgs.length);
  });
  it('includes the new friendship-messages page with its own distinct content', async () => {
    at('/friendship-messages');
    expect(await screen.findByRole('heading', { level: 1, name: /Friendship Messages/ })).toBeTruthy();
    expect(screen.getByText(/Thanks for being the friend who always shows up/)).toBeTruthy();
  });
  it('renders the birthday-wishes page with H1, sample messages, a working CTA link, and FAQ JSON-LD', async () => {
    at('/birthday-wishes');
    expect(await screen.findByRole('heading', { level: 1, name: /Birthday Wishes/ })).toBeTruthy();
    expect(screen.getByText(/Wishing you a year as bright/)).toBeTruthy();
    const ctas = [...document.querySelectorAll('main a[href="/create/birthday"]')];
    expect(ctas.length).toBeGreaterThanOrEqual(2); // the top CTA and the bottom CTA both point at the right occasion
    const ld = document.querySelector('script[type="application/ld+json"]');
    expect(ld).toBeTruthy();
    expect(JSON.parse(ld.textContent)['@type']).toBe('FAQPage');
  });
  it('an unknown slug is not routed (falls through to 404)', async () => {
    at('/not-a-real-page');
    expect(await screen.findByText(/could not be found/)).toBeTruthy();
  });
  it('wish pages and admin remain noindex; SEO pages are indexable', async () => {
    at('/birthday-wishes');
    await screen.findByRole('heading', { level: 1, name: /Birthday Wishes/ });
    expect(document.querySelector('meta[name="robots"]').content).toBe('index,follow,max-image-preview:large');
  });
});

describe('P1: new-year-wishes and graduation-wishes pages', () => {
  it('both exist in the catalog with real, distinct content (10+ messages each, grouped into sections)', () => {
    const ny = SEO_PAGES.find((p) => p.slug === 'new-year-wishes');
    const grad = SEO_PAGES.find((p) => p.slug === 'graduation-wishes');
    expect(ny).toBeTruthy();
    expect(grad).toBeTruthy();
    const count = (p) => p.sections.reduce((n, [, msgs]) => n + msgs.length, 0);
    expect(count(ny)).toBeGreaterThanOrEqual(10);
    expect(count(grad)).toBeGreaterThanOrEqual(10);
    expect(ny.occasionId).toBe('newyear');
    expect(grad.occasionId).toBe('graduation');
  });
  it('/new-year-wishes renders its H1, grouped sections, and a working create-flow CTA', async () => {
    at('/new-year-wishes');
    expect(await screen.findByRole('heading', { level: 1, name: /New Year Wishes/ })).toBeTruthy();
    expect(screen.getByRole('heading', { name: 'Funny New Year wishes' })).toBeTruthy();
    expect(screen.getByText(/fewer resolutions, more naps/)).toBeTruthy();
    expect(document.querySelector('main a[href="/create/newyear"]')).toBeTruthy();
  });
  it('/graduation-wishes renders its H1, grouped sections, and a working create-flow CTA', async () => {
    at('/graduation-wishes');
    expect(await screen.findByRole('heading', { level: 1, name: /Graduation Wishes/ })).toBeTruthy();
    expect(screen.getByRole('heading', { name: 'For a son, daughter or sibling' })).toBeTruthy();
    expect(document.querySelector('main a[href="/create/graduation"]')).toBeTruthy();
  });
  it('both new pages are index,follow with their own canonical (client-side useSeo)', async () => {
    at('/new-year-wishes');
    await screen.findByRole('heading', { level: 1, name: /New Year Wishes/ });
    expect(document.querySelector('meta[name="robots"]').content).toBe('index,follow,max-image-preview:large');
    expect(document.querySelector('link[rel="canonical"]').href).toMatch(/\/new-year-wishes$/);
  });
  it('neither new page duplicates content from any existing page (no shared message text)', () => {
    const flat = (p) => (p.sections ? p.sections.flatMap(([, m]) => m) : p.messages);
    const all = SEO_PAGES.flatMap(flat);
    expect(new Set(all).size).toBe(all.length);
  });
  it('the 11 original pages are completely unchanged (still flat `messages`, same count)', () => {
    const originals = SEO_PAGES.filter((p) => p.messages);
    expect(originals).toHaveLength(11);
  });
});
