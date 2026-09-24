-- GiftOfy v1.2.0 schema. Run once in the Supabase SQL Editor (safe to re-run).
create extension if not exists pgcrypto;

create table if not exists public.wishes (
  id             uuid primary key default gen_random_uuid(),
  short_id       text not null unique check (short_id ~ '^[A-Za-z0-9]{6,16}$'),
  occasion       text not null check (char_length(occasion) between 1 and 40),
  recipient_name text not null check (char_length(recipient_name) between 1 and 60),
  sender_name    text check (char_length(sender_name) <= 60),
  relationship   text check (char_length(relationship) <= 30),
  message        text not null check (char_length(message) between 1 and 500),
  tone           text not null check (char_length(tone) <= 30),
  design         text not null check (char_length(design) <= 30),
  surprise_mode  boolean not null default false,
  photo_url      text,  -- reserved for future uploads; not writable by the public today
  status         text not null default 'published' check (status in ('published','hidden','deleted')),
  created_at     timestamptz not null default now(),
  updated_at     timestamptz not null default now()
);
create index if not exists wishes_status_created_idx on public.wishes (status, created_at desc);

-- Authorized admins. Rows are added manually (see README); the app can never write here.
create table if not exists public.admin_users (
  user_id    uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);

create or replace function public.set_updated_at() returns trigger language plpgsql as $$
begin new.updated_at := now(); return new; end $$;
drop trigger if exists wishes_updated_at on public.wishes;
create trigger wishes_updated_at before update on public.wishes
  for each row execute function public.set_updated_at();

create or replace function public.is_admin() returns boolean
language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.admin_users where user_id = auth.uid())
$$;

-- The ONLY public read path: one published wish by its short id. No listing possible.
create or replace function public.get_wish(p_short_id text)
returns table (short_id text, occasion text, recipient_name text, sender_name text, relationship text,
               message text, tone text, design text, surprise_mode boolean, photo_url text, created_at timestamptz)
language sql stable security definer set search_path = public as $$
  select w.short_id, w.occasion, w.recipient_name, w.sender_name, w.relationship,
         w.message, w.tone, w.design, w.surprise_mode, w.photo_url, w.created_at
  from public.wishes w where w.short_id = p_short_id and w.status = 'published'
$$;

alter table public.wishes enable row level security;
alter table public.admin_users enable row level security;

-- Table privileges (RLS policies below narrow them further)
revoke all on public.wishes, public.admin_users from anon, authenticated;
grant insert (short_id, occasion, recipient_name, sender_name, relationship, message, tone, design, surprise_mode, status)
  on public.wishes to anon, authenticated;
grant select on public.wishes to authenticated;
grant update (status) on public.wishes to authenticated;      -- admins can change status only
grant select on public.admin_users to authenticated;
revoke all on function public.is_admin() from public;
revoke all on function public.get_wish(text) from public;
grant execute on function public.is_admin() to anon, authenticated;
grant execute on function public.get_wish(text) to anon, authenticated;

-- Policies
drop policy if exists wishes_public_insert on public.wishes;
create policy wishes_public_insert on public.wishes for insert to anon, authenticated
  with check (status = 'published' and photo_url is null);

drop policy if exists wishes_admin_select on public.wishes;
create policy wishes_admin_select on public.wishes for select to authenticated
  using (public.is_admin());

drop policy if exists wishes_admin_update on public.wishes;
create policy wishes_admin_update on public.wishes for update to authenticated
  using (public.is_admin()) with check (public.is_admin());

drop policy if exists admin_users_self_select on public.admin_users;
create policy admin_users_self_select on public.admin_users for select to authenticated
  using (user_id = auth.uid());
-- There is intentionally NO delete policy on wishes: moderation is soft delete (status = 'deleted').
