import { describe, expect, it } from 'vitest';
import { generateShortId } from './shortId.js';

describe('generateShortId', () => {
  it('is 8 characters from the unambiguous alphabet', () => {
    for (let i = 0; i < 200; i++) expect(generateShortId()).toMatch(/^[1-9A-HJ-NP-Za-km-z]{8}$/);
  });
  it('does not repeat across 5000 samples', () => {
    expect(new Set(Array.from({ length: 5000 }, () => generateShortId())).size).toBe(5000);
  });
});
