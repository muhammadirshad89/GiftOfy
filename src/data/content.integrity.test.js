// Guards content quality and consistency: every registry row has a body, every cross-link resolves, nothing is
// a placeholder, and no two pages share the same title, description or sample message.
import { describe, expect, it } from 'vitest';
import { PAGE_META, META_BY_KEY, META_BY_PATH } from './pageMeta.js';
import { OCCASION_BODIES } from './content/occasions.js';
import { RECIPIENT_BODIES } from './content/recipients.js';
import { GUIDE_BODIES } from './content/guides.js';
import { CORE_BODIES } from './corePages.js';
import { OCC } from './content.js';
import { titleize } from '../seo/format.js';

const BODIES = { ...OCCASION_BODIES, ...RECIPIENT_BODIES, ...GUIDE_BODIES, ...CORE_BODIES };
const withBody = PAGE_META.filter((m) => ['occasion', 'recipient', 'guide', 'core', 'legal'].includes(m.group) && BODIES[m.key]);
const walkText = (blocks) => blocks.flatMap((b) => (typeof b === 'string' ? [b] : b[0] === 'msgs' || b[0] === 'ul' || b[0] === 'ol' ? b[1] : b[0] === 'table' ? b[1].flat() : [b[1]]));
const allText = (body) => [body.lead, ...body.sections.flatMap(([h, b]) => [h, ...walkText(b)]), ...(body.faqs || []).flat()].join('\n');

describe('page registry', () => {
  it('has one body for every content page and no orphan bodies', () => {
    for (const m of PAGE_META) if (['occasion', 'recipient', 'guide', 'legal'].includes(m.group)) expect(BODIES[m.key], m.path).toBeTruthy();
    for (const k of Object.keys(BODIES)) expect(META_BY_KEY[k], `orphan body: ${k}`).toBeTruthy();
  });
  it('paths and keys are unique, clean and lowercase', () => {
    expect(new Set(PAGE_META.map((m) => m.path)).size).toBe(PAGE_META.length);
    for (const m of PAGE_META) expect(m.path, m.path).toMatch(/^\/([a-z0-9]+(-[a-z0-9]+)*(\/[a-z0-9]+(-[a-z0-9]+)*)?)?$/);
  });
  it('titles and descriptions are unique and a sensible length', () => {
    const titles = PAGE_META.map((m) => titleize(m.title, 'x'));
    expect(new Set(titles).size).toBe(titles.length);
    expect(new Set(PAGE_META.map((m) => m.desc)).size).toBe(PAGE_META.length);
    for (const m of PAGE_META) {
      expect(m.desc.length, m.path).toBeGreaterThanOrEqual(90);
      expect(m.desc.length, m.path).toBeLessThanOrEqual(175);
      if (m.title) expect(titleize(m.title).length, m.path).toBeLessThanOrEqual(66);
    }
  });
  it('every occasion id a page points at exists in the catalog', () => {
    for (const m of PAGE_META) if (m.occ) expect(OCC.some((o) => o.id === m.occ), m.path).toBe(true);
  });
});

describe('page bodies', () => {
  it('all related links and in-text links resolve to real pages', () => {
    for (const m of withBody) {
      const body = BODIES[m.key];
      for (const k of body.related || []) expect(META_BY_KEY[k], `${m.path} -> related ${k}`).toBeTruthy();
      for (const [, url] of allText(body).matchAll(/\]\((\/[^)#?]*)\)/g)) expect(META_BY_PATH[url] || url === '/create', `${m.path} -> ${url}`).toBeTruthy();
    }
  });
  it('contain no placeholder text, template leftovers or straight-quote artefacts', () => {
    for (const m of withBody) {
      const t = allText(BODIES[m.key]);
      expect(t, m.path).not.toMatch(/lorem ipsum|TODO|TBD|placeholder|\[object|undefined|\{n\}|XXX/i);
    }
  });
  it('occasion pages have real depth: several sections, many sample messages, FAQs', () => {
    for (const m of PAGE_META.filter((x) => x.group === 'occasion')) {
      const b = OCCASION_BODIES[m.key];
      const msgs = b.sections.flatMap(([, bl]) => bl.filter((x) => x[0] === 'msgs').flatMap((x) => x[1]));
      expect(b.sections.length, m.path).toBeGreaterThanOrEqual(5);
      expect(msgs.length, m.path).toBeGreaterThanOrEqual(10);
      expect(b.faqs.length, m.path).toBeGreaterThanOrEqual(3);
      expect(allText(b).split(/\s+/).length, m.path).toBeGreaterThanOrEqual(400);
    }
  });
  it('guides are long-form with FAQs', () => {
    for (const m of PAGE_META.filter((x) => x.group === 'guide')) {
      const b = GUIDE_BODIES[m.key];
      expect(b.sections.length, m.path).toBeGreaterThanOrEqual(5);
      expect(b.faqs.length, m.path).toBeGreaterThanOrEqual(3);
      expect(allText(b).split(/\s+/).length, m.path).toBeGreaterThanOrEqual(450);
    }
  });
  it('recipient pages carry their own advice, sample messages and FAQs', () => {
    for (const m of PAGE_META.filter((x) => x.group === 'recipient')) {
      const b = RECIPIENT_BODIES[m.key];
      expect(b.sections.length, m.path).toBeGreaterThanOrEqual(6);
      expect(b.faqs.length, m.path).toBeGreaterThanOrEqual(3);
      expect(b.ctas.length, m.path).toBeGreaterThanOrEqual(2);
      expect(allText(b).split(/\s+/).length, m.path).toBeGreaterThanOrEqual(330);
    }
  });
  it('no sample message is repeated across pages (no duplicate content)', () => {
    const seen = new Map();
    for (const m of PAGE_META) {
      const b = BODIES[m.key]; if (!b) continue;
      for (const [, blocks] of b.sections) for (const bl of blocks) if (bl[0] === 'msgs') for (const msg of bl[1]) {
        expect(seen.has(msg), `"${msg}" appears on ${seen.get(msg)} and ${m.path}`).toBe(false);
        seen.set(msg, m.path);
      }
    }
    expect(seen.size).toBeGreaterThan(300);
  });
  it('never fabricates testimonials, ratings, user counts or awards', () => {
    for (const m of withBody) expect(allText(BODIES[m.key]), m.path).not.toMatch(/\b\d[\d,]*\+? (happy )?(users|customers|people have)|★|rated \d|five-star|5-star|award[- ]winning|as seen on|trusted by/i);
  });
  it('never calls the built-in suggestions AI, and Christmas page says there is no dedicated design', () => {
    for (const m of withBody) expect(allText(BODIES[m.key]), m.path).not.toMatch(/AI-generated|generated by AI|powered by AI/i);
    expect(allText(OCCASION_BODIES['christmas-wishes'])).toMatch(/does not currently have a dedicated Christmas|Not yet/);
  });
});
