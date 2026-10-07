// Recipient replies. Mirrors wishService.js: this is the only file that talks to wish_replies.
import { supabase, isConfigured } from '../lib/supabase.js';
import { generateReplyToken } from '../utils/replyToken.js';

const UNAVAILABLE = 'GiftOfy is having trouble sending your reply right now. Please try again in a moment.';
const REACTIONS = ['love', 'smile', 'sweet', 'thankyou', 'laugh', 'amazing'];
const REPLY_SHARE_TEXT = 'Someone replied to your GiftOfy wish 💌 Open their reply:';
const clean = (v, n) => String(v ?? '').trim().slice(0, n);

export class ReplyError extends Error {
  constructor(userMessage, code) { super(code || userMessage); this.userMessage = userMessage; this.code = code; }
}
const need = () => { if (!isConfigured || !supabase) throw new ReplyError(UNAVAILABLE, 'unavailable'); };

/** Sends a reply to a published wish and returns its private reply_token. The token is generated
 * here, client-side, and included in the insert — so the caller already knows it the moment this
 * resolves, with no RETURNING/SELECT round-trip needed (anon has no SELECT privilege on
 * wish_replies at all; see 007_private_reply_links.sql for why that matters). */
export async function sendReply(shortId, { senderName, message, reaction }) {
  const msg = clean(message, 500);
  if (!msg) throw new ReplyError('Please write a message before sending.', 'invalid');
  need();
  for (let i = 0; i < 3; i++) {
    const reply_token = generateReplyToken();
    const payload = {
      wish_short_id: shortId,
      sender_name: clean(senderName, 60) || null,
      message: msg,
      reaction: REACTIONS.includes(reaction) ? reaction : null,
      reply_token,
    };
    const { error } = await supabase.from('wish_replies').insert(payload);
    if (import.meta.env.DEV) { // dev-only: the real Postgres/PostgREST error, never any secret or key
      console.debug('[GiftOfy] wish_replies insert', { payload: { ...payload, reply_token: reply_token.slice(0, 6) + '…' }, error: error && { message: error.message, code: error.code, details: error.details, hint: error.hint } });
    }
    if (!error) return reply_token;
    if (error.code !== '23505') break; // 23505 = token collision (astronomically unlikely); anything else won't fix itself
  }
  throw new ReplyError('We couldn’t send your reply. Please try again.', 'send_failed');
}

/** Admin-only (enforced by RLS) — used by the admin dashboard to show replies for one wish. */
export async function listRepliesForWish(shortId) {
  need();
  const { data, error } = await supabase.from('wish_replies').select('sender_name,message,reaction,created_at')
    .eq('wish_short_id', shortId).order('created_at', { ascending: false });
  if (error) throw new ReplyError('Couldn’t load replies. Your session may have expired.', 'list_failed');
  return data;
}

/** The ONE reply a private token unlocks — nothing else (see get_reply_by_token in
 * 007_private_reply_links.sql). Returns null for an unknown/mistyped token, same "don't reveal
 * which part is wrong" shape as getWishByShortId. */
export async function getReplyByToken(token) {
  if (!/^rp_[0-9a-f]{40}$/.test(token || '')) return null;
  need();
  const { data, error } = await supabase.rpc('get_reply_by_token', { p_token: token });
  if (error) throw new ReplyError('Couldn’t load this reply right now. Please try again.', 'load_failed');
  const r = Array.isArray(data) ? data[0] : data;
  return r || null;
}

export const replyUrl = (token) => `${(import.meta.env.VITE_SITE_URL || window.location.origin).replace(/\/$/, '')}/reply/${token}`;
export const whatsappReplyUrl = (url) => `https://wa.me/?text=${encodeURIComponent(`${REPLY_SHARE_TEXT} ${url}`)}`;
