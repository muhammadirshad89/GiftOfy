import { describe, expect, it, vi } from 'vitest';
import { getReplyByToken } from './replyService.js';
import { supabase } from '../test/fakeSupabase.js';

vi.mock('../lib/supabase.js', async () => import('../test/fakeSupabase.js'));

describe('private reply security model', () => {
  it('a reply lookup never goes through a plain table select — only the narrow RPC', async () => {
    const spy = vi.spyOn(supabase, 'from');
    await getReplyByToken('rp_' + '0'.repeat(40));
    expect(spy).not.toHaveBeenCalledWith('wish_replies'); // table access would require SELECT privilege anon never has
    spy.mockRestore();
  });
  it('the RPC is called with exactly the token, nothing else that could widen the match', async () => {
    const spy = vi.spyOn(supabase, 'rpc');
    await getReplyByToken('rp_' + '1'.repeat(40));
    expect(spy).toHaveBeenCalledWith('get_reply_by_token', { p_token: 'rp_' + '1'.repeat(40) });
    spy.mockRestore();
  });
});
