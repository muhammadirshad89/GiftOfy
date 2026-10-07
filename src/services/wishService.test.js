import { beforeEach, describe, expect, it, vi } from 'vitest';
import { createWish, getWishByShortId, WishError } from './wishService.js';
import { db } from '../test/fakeSupabase.js';
import { generateShortId } from '../utils/shortId.js';

vi.mock('../lib/supabase.js', async () => import('../test/fakeSupabase.js'));
vi.mock('../utils/shortId.js', () => ({ generateShortId: vi.fn() }));

const wish = { o: 'birthday', n: 'Ayesha', r: 'Friend', s: '', h: false, t: 'aurora', st: 'romantic', m: 'Hello' };
beforeEach(() => { db.length = 0; generateShortId.mockReset(); });

describe('wishService', () => {
  it('saves a published wish and returns its short id', async () => {
    generateShortId.mockReturnValue('Ab3dE6gH');
    expect(await createWish(wish)).toBe('Ab3dE6gH');
    expect(db[0]).toMatchObject({ short_id: 'Ab3dE6gH', occasion: 'birthday', recipient_name: 'Ayesha', sender_name: null, tone: 'romantic', design: 'aurora', status: 'published' });
  });
  it('retries when a short id collides', async () => {
    db.push({ short_id: 'AAAAAAAA' });
    generateShortId.mockReturnValueOnce('AAAAAAAA').mockReturnValueOnce('BBBBBBBB');
    expect(await createWish(wish)).toBe('BBBBBBBB');
  });
  it('rejects an invalid wish without saving', async () => {
    await expect(createWish({ ...wish, n: '  ' })).rejects.toBeInstanceOf(WishError);
    expect(db).toHaveLength(0);
  });
  it('returns published wishes, null for hidden, unknown and malformed ids', async () => {
    db.push({ short_id: 'Ab3dE6gH', occasion: 'eid', recipient_name: 'Sara', message: 'Hi', tone: 'dua', design: 'paper', status: 'published' });
    db.push({ short_id: 'Hidden88', occasion: 'eid', recipient_name: 'X', message: 'Hi', tone: 'dua', design: 'paper', status: 'hidden' });
    expect(await getWishByShortId('Ab3dE6gH')).toMatchObject({ o: 'eid', n: 'Sara', t: 'paper' });
    expect(await getWishByShortId('Hidden88')).toBeNull();
    expect(await getWishByShortId('Zzzzzzzz')).toBeNull();
    expect(await getWishByShortId('bad id!')).toBeNull();
  });
});
