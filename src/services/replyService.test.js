import { beforeEach, describe, expect, it, vi } from 'vitest';
import { sendReply, listRepliesForWish, ReplyError } from './replyService.js';
import { db, repliesDb } from '../test/fakeSupabase.js';

vi.mock('../lib/supabase.js', async () => import('../test/fakeSupabase.js'));
beforeEach(() => { db.length = 0; repliesDb.length = 0; });

describe('replyService (Supabase reply insertion + RLS behavior)', () => {
  it('sends a reply to a published wish', async () => {
    db.push({ short_id: 'Ab3dE6gH', status: 'published' });
    await sendReply('Ab3dE6gH', { senderName: 'Sara', message: 'This made my day!', reaction: 'love' });
    expect(repliesDb).toEqual([{ wish_short_id: 'Ab3dE6gH', sender_name: 'Sara', message: 'This made my day!', reaction: 'love' }]);
  });
  it('rejects an empty message without touching the database', async () => {
    db.push({ short_id: 'Ab3dE6gH', status: 'published' });
    await expect(sendReply('Ab3dE6gH', { senderName: '', message: '   ', reaction: null })).rejects.toBeInstanceOf(ReplyError);
    expect(repliesDb).toHaveLength(0);
  });
  it('drops an unrecognized reaction value rather than storing it', async () => {
    db.push({ short_id: 'Ab3dE6gH', status: 'published' });
    await sendReply('Ab3dE6gH', { senderName: '', message: 'Hi', reaction: 'not-a-real-reaction' });
    expect(repliesDb[0].reaction).toBeNull();
  });
  it('mirrors wish_replies_public_insert RLS: a reply to a hidden/unpublished/nonexistent wish is refused', async () => {
    db.push({ short_id: 'Hidden88', status: 'hidden' });
    await expect(sendReply('Hidden88', { message: 'Hi' })).rejects.toBeInstanceOf(ReplyError);
    await expect(sendReply('NoSuchId', { message: 'Hi' })).rejects.toBeInstanceOf(ReplyError);
    expect(repliesDb).toHaveLength(0);
  });
  it('admin can list replies for a wish, newest first; a reply never exposes which row it belongs to beyond the lookup', async () => {
    db.push({ short_id: 'Ab3dE6gH', status: 'published' });
    repliesDb.push({ wish_short_id: 'Ab3dE6gH', sender_name: 'A', message: 'first', reaction: null, created_at: '2026-01-01' });
    repliesDb.push({ wish_short_id: 'Ab3dE6gH', sender_name: 'B', message: 'second', reaction: 'smile', created_at: '2026-01-02' });
    const list = await listRepliesForWish('Ab3dE6gH');
    expect(list.map((r) => r.message)).toEqual(['second', 'first']);
    expect(list[0]).not.toHaveProperty('wish_short_id'); // the selected columns never include it
  });
});
