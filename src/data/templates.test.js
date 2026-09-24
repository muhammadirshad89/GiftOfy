import { describe, expect, it } from 'vitest';
import { TEMPLATES } from './templates.js';
import { OCC } from './content.js';

describe('template catalog', () => {
  it('has 50+ templates with unique ids that fit the database column', () => {
    expect(TEMPLATES.length).toBeGreaterThanOrEqual(50);
    expect(new Set(TEMPLATES.map((t) => t.id)).size).toBe(TEMPLATES.length);
    TEMPLATES.forEach((t) => expect(t.id.length).toBeLessThanOrEqual(30));
  });
  it('gives every template the required fields and a message that fits 500 characters', () => {
    TEMPLATES.forEach((t) => {
      ['occ', 'title', 'desc', 'style', 'msg'].forEach((k) => expect(t[k], `${t.id}.${k}`).toBeTruthy());
      expect(typeof t.premium).toBe('boolean');
      expect(t.msg.length).toBeLessThan(500);
      expect(t.msg).toContain('{n}');
    });
  });
  it('covers every occasion', () => OCC.forEach((o) => expect(TEMPLATES.some((t) => t.occ === o.id), o.id).toBe(true)));
  it('no two designs share the same look, and layouts/fonts genuinely vary', () => {
    const sig = (t) => (t.legacy ? t.id : [t.layout, t.bg, t.font, t.decor, t.anim].join('|'));
    expect(new Set(TEMPLATES.map(sig)).size).toBe(TEMPLATES.length);
    const nl = TEMPLATES.filter((t) => !t.legacy);
    expect(new Set(nl.map((t) => t.layout)).size).toBeGreaterThanOrEqual(8);
    expect(new Set(nl.map((t) => t.font)).size).toBeGreaterThanOrEqual(5);
    expect(new Set(nl.map((t) => t.anim)).size).toBe(4);
  });
});
