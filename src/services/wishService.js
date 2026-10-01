// All wish reads/writes live here; components never call Supabase directly.
import { isConfigured, supabase } from '../lib/supabase.js';
import { OCC, STY } from '../data/content.js';
import { TEMPLATE_MAP } from '../data/templates.js';
import { generateShortId } from '../utils/shortId.js';

export const SHARE_TEXT = 'Someone made a special surprise for you ❤️ Open it here:';
const UNAVAILABLE = 'GiftOfy is having trouble saving and loading wishes right now. Please try again in a moment.';
const ID_RE = /^[A-Za-z0-9]{6,16}$/;
const STATUSES = ['published', 'hidden', 'deleted'];

/** Error with a message that is safe to show to users. Raw database errors never reach the UI. */
export class WishError extends Error {
  constructor(userMessage, code) { super(code || userMessage); this.userMessage = userMessage; this.code = code; }
}
const clean = (v, n) => String(v ?? '').trim().slice(0, n);
const ENV_KEYS = ['VITE_SUPABASE_URL', 'VITE_SUPABASE_ANON_KEY'];
const need = () => {
  if (isConfigured && supabase) return;
  if (import.meta.env.DEV) { // dev-only: names of missing variables, never their values
    const missing = ENV_KEYS.filter((k) => !import.meta.env[k]).join(', ');
    console.error(`[GiftOfy] Supabase is not configured (missing: ${missing}). Add them to .env next to package.json and restart "npm run dev".`);
    throw new WishError('Dev: Supabase env variables are missing. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to .env and restart npm run dev.', 'unavailable');
  }
  throw new WishError(UNAVAILABLE, 'unavailable');
};

function toRow(w) {
  const row = {
    occasion: clean(w.o, 40), recipient_name: clean(w.n, 60), sender_name: clean(w.s, 60) || null,
    relationship: clean(w.r, 30) || null, message: clean(w.m, 500),
    tone: STY.some(([id]) => id === w.st) ? w.st : 'simple',
    design: TEMPLATE_MAP[w.t] && !TEMPLATE_MAP[w.t].premium ? w.t : 'aurora',
    surprise_mode: !!w.h, status: 'published',
  };
  if (!OCC.some((o) => o.id === row.occasion) || !row.recipient_name || !row.message) {
    throw new WishError('Please add a recipient name and a message before publishing.', 'invalid');
  }
  return row;
}

const fromRow = (r) => ({
  o: OCC.some((o) => o.id === r.occasion) ? r.occasion : 'birthday',
  n: clean(r.recipient_name, 60), r: clean(r.relationship, 30), s: clean(r.sender_name, 60),
  h: !!r.surprise_mode, t: TEMPLATE_MAP[r.design] && !TEMPLATE_MAP[r.design].premium ? r.design : 'aurora',
  m: clean(r.message, 500), st: r.tone,
});

/** Saves a wish and returns its short id. Retries if a generated id collides. */
export async function createWish(wish) {
  const row = toRow(wish);
  need();
  for (let i = 0; i < 4; i++) {
    const short_id = generateShortId();
    const { error } = await supabase.from('wishes').insert({ ...row, short_id });
    if (!error) return short_id;
    if (error.code !== '23505') break; // 23505 = unique violation; anything else won't fix itself
  }
  throw new WishError('We couldn’t publish your wish. Please try again.', 'create_failed');
}

/** Returns the wish, or null if it doesn't exist / isn't published. Throws WishError if the backend is unreachable. */
export async function getWishByShortId(id) {
  if (!ID_RE.test(id || '')) return null;
  need();
  const { data, error } = await supabase.rpc('get_wish', { p_short_id: id });
  if (error) throw new WishError(UNAVAILABLE, 'load_failed'); // real failure: never reported as "not found"
  const r = Array.isArray(data) ? data[0] : data; // PostgREST returns an array for table-returning functions
  return r ? fromRow(r) : null; // null only when the RPC succeeded and returned no published wish
}

const ADMIN_COLS = 'short_id,occasion,recipient_name,sender_name,relationship,message,tone,design,surprise_mode,status,created_at';

export async function listAdminWishes() {
  need();
  const { data, error } = await supabase.from('wishes').select(ADMIN_COLS).order('created_at', { ascending: false }).limit(1000);
  if (error) throw new WishError('Couldn’t load wishes. Your session may have expired, so try signing in again.', 'admin_list_failed');
  return data;
}

export async function updateWishStatus(shortId, status) {
  need();
  if (!STATUSES.includes(status)) throw new WishError('Unknown status.', 'invalid');
  const { data, error } = await supabase.from('wishes').update({ status }).eq('short_id', shortId).select('short_id');
  if (error || !data?.length) throw new WishError('That change wasn’t saved. You may not have permission, or your session expired.', 'update_failed');
}
export const softDeleteWish = (shortId) => updateWishStatus(shortId, 'deleted');

export const wishUrl = (id) => `${(import.meta.env.VITE_SITE_URL || window.location.origin).replace(/\/$/, '')}/wish/${id}`;
export const whatsappUrl = (url) => `https://wa.me/?text=${encodeURIComponent(`${SHARE_TEXT} ${url}`)}`;
