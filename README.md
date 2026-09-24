# GiftOfy v1.2.0
Create a Wish. Share the Moment. Send a Gift. ❤️

React + Vite + React Router, with Supabase (Postgres, Auth, Row Level Security) as the backend.

## Run locally
```bash
npm install
cp .env.example .env     # then fill in your Supabase values
npm run dev              # http://localhost:5173
npm run build            # production build in dist/
npm test                 # vitest (uses an in-memory fake of Supabase)
```

## Supabase setup
1. Create a project at supabase.com.
2. Open **SQL Editor**, paste all of `supabase/schema.sql` and run it. It is safe to re-run.
3. **Project Settings > API**: copy the Project URL and the **anon public** key into `.env` as `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`. Never use the service_role key in this app.
4. Optional but recommended: **Authentication > Providers > Email**, turn off "Allow new users to sign up" so only users you create can sign in.

### Create the first admin
1. **Authentication > Users > Add user**: enter your email and a strong password (tick "Auto confirm user").
2. In the SQL Editor run (use your email):
```sql
insert into public.admin_users (user_id)
select id from auth.users where email = 'you@example.com';
```
3. Open `/admin/login` and sign in.

## How it works
- **Short ids**: a wish is saved as a row; its public URL is `/wish/{8-char random id}` (about 1.3e14 possibilities, from a secure random source).
- **Public access**: anonymous users can only (a) insert a published wish and (b) call `get_wish(short_id)`, which returns one published wish. They cannot list, read or change other rows.
- **Admin authorization**: Supabase Auth signs the user in; the database function `is_admin()` checks the `admin_users` table. RLS policies let only admins read all wishes and change `status`. Hiding the `/admin` route is only a convenience; RLS is the security.
- **Moderation**: statuses are `published`, `hidden`, `deleted`. Nothing is hard-deleted; hidden/deleted wishes return "not found" publicly.
- **Code layout**: `src/lib/supabase.js` (client), `src/services/wishService.js` and `authService.js` (all backend calls), `src/pages/Admin*.jsx`, `src/components/AdminGate.jsx`.
- **SEO**: wish and admin pages are `noindex`; wishes are not in any sitemap.
- **Photos**: the `photo_url` column exists but there is no upload feature yet, and the public cannot write it.
- **Payments**: not implemented.

## Deploy to Vercel
1. Push to GitHub and import the repo in Vercel (framework preset: Vite).
2. **Settings > Environment Variables**: add `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`, `VITE_SITE_URL=https://giftofy.vercel.app` for Production (and Preview if wanted), then redeploy. Vite reads these at build time.
3. `vercel.json` already rewrites every path to `index.html`, so `/admin`, `/admin/login` and `/wish/abc123` work on refresh.
4. In Supabase **Authentication > URL Configuration**, set the Site URL to your Vercel domain.

## Deployment checklist
- [ ] `schema.sql` run without errors
- [ ] First admin created and can sign in
- [ ] Env vars set in Vercel and redeployed
- [ ] Create a wish, open its `/wish/{id}` link in a private window
- [ ] Hide it in `/admin`; the link now says not found. Publish it again; it works
- [ ] Anonymous visit to `/admin` redirects to `/admin/login`
- [ ] Refresh `/admin` and `/wish/{id}` directly (no 404)
- [ ] No `.env` or service_role key committed
