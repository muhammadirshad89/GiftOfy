// Recipient replies. Mirrors wishService.js: this is the only file that talks to wish_replies.
import { supabase, isConfigured } from '../lib/supabase.js';

const UNAVAILABLE = 'GiftOfy is having trouble sending your reply right now. Please try again in a moment.';
const REACTIONS = ['love', 'smile', 'sweet', 'thankyou', 'laugh', 'amazing'];
const clean = (v, n) => String(v ?? '').trim().slice(0, n);

export class ReplyError extends Error {
  constructor(userMessage, code) { super(code || userMessage); this.userMessage = userMessage; this.code = code; }
}
const need = () => { if (!isConfigured || !supabase) throw new ReplyError(UNAVAILABLE, 'unavailable'); };

/** Sends a reply to a published wish. Never reveals whether the wish exists beyond what
 * get_wish() already would — an invalid short_id just fails the same way a database error would. */
export async function sendReply(shortId, { senderName, message, reaction }) {
  const msg = clean(message, 500);
  if (!msg) throw new ReplyError('Please write a message before sending.', 'invalid');
  need();
  const { error } = await supabase.from('wish_replies').insert({
    wish_short_id: shortId,
    sender_name: clean(senderName, 60) || null,
    message: msg,
    reaction: REACTIONS.includes(reaction) ? reaction : null,
  });
  if (error) throw new ReplyError('We couldn’t send your reply. Please try again.', 'send_failed');
}

/** Admin-only (enforced by RLS) — used by the admin dashboard to show replies for one wish. */
export async function listRepliesForWish(shortId) {
  need();
  const { data, error } = await supabase.from('wish_replies').select('sender_name,message,reaction,created_at')
    .eq('wish_short_id', shortId).order('created_at', { ascending: false });
  if (error) throw new ReplyError('Couldn’t load replies. Your session may have expired.', 'list_failed');
  return data;
}
