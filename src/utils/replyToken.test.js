import { describe, expect, it } from 'vitest';
import { generateReplyToken } from './replyToken.js';

describe('generateReplyToken', () => {
  it('is "rp_" plus 40 hex characters (160 bits)', () => {
    for (let i = 0; i < 200; i++) expect(generateReplyToken()).toMatch(/^rp_[0-9a-f]{40}$/);
  });
  it('does not repeat across 3000 samples', () => {
    expect(new Set(Array.from({ length: 3000 }, () => generateReplyToken())).size).toBe(3000);
  });
  it('is not sequential, timestamp-based or otherwise derivable from the previous token', () => {
    const a = generateReplyToken(), b = generateReplyToken();
    expect(a.slice(0, 10)).not.toBe(b.slice(0, 10)); // wildly unlikely to share a prefix if truly random
  });
});
