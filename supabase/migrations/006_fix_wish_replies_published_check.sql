-- Fixes a real bug in 005_wish_replies.sql. Run this once in the Supabase SQL Editor; safe to re-run.
--
-- Root cause: wish_replies_public_insert's WITH CHECK queried public.wishes directly as the
-- connecting role. anon/authenticated have no SELECT privilege on public.wishes at all (schema.sql
-- grants SELECT on wishes to authenticated admins only) — so every reply insert failed with
-- "permission denied for table wishes" (42501), regardless of whether the wish was published.
--
-- Fix: move the published-check into a security definer function (same pattern already used by
-- get_wish() and is_admin()), which is allowed to read wishes on the caller's behalf without
-- granting the caller any direct access to the table. This does not add SELECT access for public
-- users and does not weaken any existing RLS — if anything it's the RLS working as originally
-- intended, just via a path that doesn't require a privilege anon was never meant to have.

create or replace function public.wish_is_published(p_short_id text)
returns boolean
language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.wishes w where w.short_id = p_short_id and w.status = 'published')
$$;
revoke all on function public.wish_is_published(text) from public;
grant execute on function public.wish_is_published(text) to anon, authenticated;

drop policy if exists wish_replies_public_insert on public.wish_replies;
create policy wish_replies_public_insert on public.wish_replies for insert to anon, authenticated
  with check (public.wish_is_published(wish_short_id));
