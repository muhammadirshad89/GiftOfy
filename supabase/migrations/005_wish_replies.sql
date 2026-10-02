-- GiftOfy v1.8.0: recipient replies. RUN THIS in the Supabase SQL Editor before deploying v1.8.0 —
-- the reply feature will fail (safely, with a friendly error) without it. Safe to re-run.
-- Depends on schema.sql (public.wishes, public.is_admin()) already being applied.

-- Referenced by short_id (not the internal uuid id) because that's the only identifier the
-- recipient's browser ever has — get_wish() never exposes wishes.id, and it doesn't need to.
create table if not exists public.wish_replies (
  id             uuid primary key default gen_random_uuid(),
  wish_short_id  text not null references public.wishes(short_id) on delete cascade,
  sender_name    text check (char_length(sender_name) <= 60),    -- the recipient's own name, optional
  message        text not null check (char_length(message) between 1 and 500),
  reaction       text check (reaction in ('love','smile','sweet','thankyou','laugh','amazing')),
  created_at     timestamptz not null default now()
);
create index if not exists wish_replies_short_id_idx on public.wish_replies (wish_short_id, created_at desc);

alter table public.wish_replies enable row level security;
revoke all on public.wish_replies from anon, authenticated;

-- Anyone can leave a reply on a wish that is currently published (mirrors who can read the wish
-- itself via get_wish()) — but only an insert; they can never read, edit or delete replies,
-- including their own or anyone else's.
grant insert (wish_short_id, sender_name, message, reaction) on public.wish_replies to anon, authenticated;
create policy wish_replies_public_insert on public.wish_replies for insert to anon, authenticated
  with check (exists (select 1 from public.wishes w where w.short_id = wish_short_id and w.status = 'published'));

-- Only an admin can read replies (there is no sender login/notification system yet — see README).
grant select on public.wish_replies to authenticated;
create policy wish_replies_admin_select on public.wish_replies for select to authenticated
  using (public.is_admin());

-- No update/delete policy for anyone except via direct database access — replies are permanent
-- once sent, same as the "no delete" stance already used for wishes (status changes only).
