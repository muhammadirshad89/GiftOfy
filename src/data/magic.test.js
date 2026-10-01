import { describe, expect, it } from 'vitest';
import { magicFor } from './magic.js';
import { OCC } from './content.js';

const SHAPES = ['balloon', 'envelope', 'ring', 'heart', 'hearts', 'gift', 'moon', 'bouquet'];

describe('magic wish configuration', () => {
  it('gives every occasion a complete, valid config', () => {
    OCC.forEach((o) => {
      const m = magicFor(o.id);
      expect(SHAPES).toContain(m.shape);
      ['label', 'prompt', 'tapHint', 'accent', 'closing'].forEach((k) => expect(m[k], `${o.id}.${k}`).toBeTruthy());
      expect(m.particles.length).toBeGreaterThan(0);
    });
  });
  it('falls back to a sensible default for an unknown occasion', () => {
    expect(magicFor('unknown-occasion').shape).toBe('gift');
  });
  it('matches the brief for key occasions (balloon/envelope/ring)', () => {
    expect(magicFor('birthday').shape).toBe('balloon');
    expect(magicFor('wedding').shape).toBe('envelope');
    expect(magicFor('engagement').shape).toBe('ring');
    expect(magicFor('valentines').shape).toBe('heart');
  });
});
