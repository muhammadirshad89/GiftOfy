// Exercises sendReply() through the REAL supabase-js client (only HTTP is stubbed), proving:
// 1) the exact payload sent matches the four writable columns, nothing more;
// 2) a 42501 "permission denied for table wishes" response (what the broken 005 policy produced)
//    is surfaced as a send failure, not silently swallowed;
// 3) a clean 201 (what the 006-fixed policy produces) succeeds.
import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest';

beforeAll(() => {});
afterAll(() => vi.unstubAllEnvs());

async function callSendReply(respond) {
  vi.resetModules();
  vi.stubEnv('VITE_SUPABASE_URL', 'https://example.supabase.co');
  vi.stubEnv('VITE_SUPABASE_ANON_KEY', 'anon-placeholder');
  const calls = [];
  globalThis.fetch = vi.fn(async (url, opts) => { calls.push({ url: String(url), method: opts?.method, body: opts?.body }); return respond(); });
  const { sendReply } = await import('./replyService.js');
  let caught = null;
  try { await sendReply('Ab3dE6gH', { senderName: 'Sara', message: 'Thank you!', reaction: 'love' }); }
  catch (e) { caught = e; }
  return { calls, caught };
}

describe('sendReply against the real Supabase client', () => {
  it('sends exactly the four writable columns, no id/created_at', async () => {
    const { calls } = await callSendReply(() => new Response(null, { status: 201 }));
    const insert = calls.find((c) => c.url.includes('/rest/v1/wish_replies'));
    const body = JSON.parse(insert.body);
    expect(Object.keys(body).sort()).toEqual(['message', 'reaction', 'reply_token', 'sender_name', 'wish_short_id']);
    expect(body.reply_token).toMatch(/^rp_[0-9a-f]{40}$/);
    expect(body).toMatchObject({ wish_short_id: 'Ab3dE6gH', sender_name: 'Sara', message: 'Thank you!', reaction: 'love' });
  });
  it('reproduces the production bug: a 42501 permission-denied response is reported as a failure', async () => {
    const { caught } = await callSendReply(() => new Response(
      JSON.stringify({ code: '42501', message: 'permission denied for table wishes' }),
      { status: 403, headers: { 'Content-Type': 'application/json' } },
    ));
    expect(caught).toBeTruthy();
    expect(caught.code).toBe('send_failed');
    expect(caught.userMessage).toMatch(/couldn’t send your reply/);
  });
  it('succeeds once the policy returns success (what 006’s fix produces)', async () => {
    const { caught } = await callSendReply(() => new Response(null, { status: 201 }));
    expect(caught).toBeNull();
  });
});
