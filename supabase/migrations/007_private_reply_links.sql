-- GiftOfy v1.9: private reply links. Run this once in the Supabase SQL Editor; safe to re-run.
-- Purely additive — does not modify 005_wish_replies.sql or 006_fix_wish_replies_published_check.sql.
-- Depends on 005 (public.wish_replies) and 006 already being applied.

-- A long, random, non-guessable token per reply. The app generates this client-side (see
-- src/utils/replyToken.js — 160 bits from the browser's secure random source, same family of
-- technique as wish short_ids, just far longer because this token alone grants read access to one
-- reply) and sends it as part of the insert, so no RETURNING/SELECT round-trip is ever needed for
-- an anonymous recipient (they already know the value they generated and sent).
-- The DEFAULT below exists only as a safety net — for any row inserted without one, and to
-- backfill replies that already exist from before this migration (Postgres evaluates a volatile
-- DEFAULT per existing row on ADD COLUMN, so each gets its own distinct random token, not a shared one).
alter table public.wish_replies
  add column if not exists reply_token text not null default ('rp_' || encode(gen_random_bytes(20), 'hex'));

create unique index if not exists wish_replies_reply_token_idx on public.wish_replies (reply_token);

-- The client already supplies reply_token in its own INSERT, so it needs column-level INSERT
-- privilege for it too (005 only granted wish_short_id/sender_name/message/reaction). This is an
-- additional grant, not a change to 005's statement.
grant insert (reply_token) on public.wish_replies to anon, authenticated;

-- The ONLY public read path for a reply: exactly one row, by its exact token. No listing, no
-- filtering by wish, no other columns exposed (no id, no wish_short_id). Mirrors get_wish().
create or replace function public.get_reply_by_token(p_token text)
returns table (sender_name text, message text, reaction text, created_at timestamptz)
language sql stable security definer set search_path = public as $$
  select r.sender_name, r.message, r.reaction, r.created_at
  from public.wish_replies r
  where r.reply_token = p_token
$$;
revoke all on function public.get_reply_by_token(text) from public;
grant execute on function public.get_reply_by_token(text) to anon, authenticated;

-- No change to table-level SELECT grants or to wish_replies_admin_select: wish_replies remains
-- unreadable by anon/authenticated except through this one narrow function, and admins keep their
-- existing full read access unchanged.
