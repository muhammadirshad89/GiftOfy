# GiftOfy v1.9.0 — Private Reply Links
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
- **Monetization**: GiftOfy is a free wishes platform. No payment/monetary-gift feature exists or is planned; monetization is organic SEO traffic + Google AdSense on public content pages.

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

## Templates (v1.3.0)
`src/data/templates.js` is the catalog: one row per template (occasion, style, layout, palette, font, decor, animation, message, `premium` flag). The 9 layouts and font/animation classes live in `src/styles/global.css`; `src/utils/look.js` maps a template id to its CSS. Adding a template = adding a row. Saved wishes store the template id in `wishes.design`, so never rename or delete an existing id (aurora, paper, neon, garden, sunset, gold are kept for old wishes).

## Magic Wish Experience (v1.4.0)
Started from the clean v1.3.0 codebase. **No photo-upload code from the cancelled v1.4 Photo build is present** (no PhotoPicker, mediaService, photo_path, wish-media bucket, or related tests).

- **New palette**: maroon/burgundy/rose/violet/cream tokens in `src/styles/global.css` (`--acc`, `--acc2`, `--pk`, `--gold`, `--violet`, `--g1/2`), same on mobile and desktop; only the layout is responsive.
- **Recipient experience**: `/wish/:id` first shows an occasion-specific interactive object (`src/components/InteractiveObject.jsx`, pure CSS — balloon, envelope, ring, heart, gift box, moon, bouquet) the recipient taps or clicks. `src/data/magic.js` maps each of the 19 occasions to an object, a prompt, floating-particle types and a closing line — one row per occasion, no branching in components. After the tap, `WishReveal.jsx` staggers in the wish, a closing line ("One little thing before you go...") and an optional client-side reaction (Love it / Made me smile / So special).
- **Floating background**: `FloatingBackground.jsx` renders a small, fixed number of CSS-animated particles (hearts, balloons, petals, sparkles, stars, confetti) behind the object and the reveal; a short "burst" plays at the tap moment. No canvas, no animation library, no Three.js.
- **Database**: unchanged from v1.3.0. The magic effect is derived entirely from the wish's existing `occasion`, so no migration was needed — see "Why no database change" below.
- **Accessibility**: the object is a real `<button>` with an occasion-specific label ("Open birthday surprise", "Open wedding envelope", …). `prefers-reduced-motion` removes the floating motion and staggered delays and shows the wish immediately after a tap.

### Why no database change
The brief allows storing a chosen magic effect only if it "genuinely needs persistence and cannot reuse an existing field." Each occasion already has one clear, well-matched effect (balloon → birthday, envelope → wedding, ring → engagement, etc.), so the effect is derived from the existing `occasion` column with no new data to store. The create wizard's "Your Wish's Magic" panel explains which effect the occasion will use; it does not yet let the sender override it, because doing that safely would need a new column (a later, small, additive migration — see Limitations).


## v1.6.0
- **SEO pages:** 10 new indexable landing pages with genuinely distinct content, one per occasion that already has real designs — `/birthday-wishes`, `/anniversary-wishes`, `/wedding-wishes`, `/engagement-wishes`, `/eid-wishes`, `/valentine-wishes`, `/congratulations-messages`, `/thank-you-messages`, `/get-well-soon-wishes`, `/miss-you-messages`. Each has its own title/description/canonical (via `useSeo`), an H1, real sample messages (not copied from the template message library), an FAQ with valid `FAQPage` JSON-LD, internal links to `/create/:occasion` and to other SEO pages, and is linked from the footer. All are added to `public/sitemap.xml`. `/wish/:id` and `/admin*` remain `noindex`; `robots.txt` is unchanged (still disallows `/admin`).

## v1.7.0
- **SEO:** added `/friendship-messages` (11th page) — distinct from birthday/other occasions, general appreciation rather than tied to an event. Sitemap updated.

## v1.9.0: private reply links
Run `supabase/migrations/007_private_reply_links.sql` (purely additive — does not modify 005 or 006).

- When a recipient submits a reply, the browser generates a long random token (`src/utils/replyToken.js`: `rp_` + 160 random bits) and sends it as part of the same insert — no extra round-trip, and no SELECT privilege is ever needed for an anonymous sender.
- The success screen now shows **"Your reply has been sent ❤️"** with **Copy Private Link** and **Share on WhatsApp** buttons (plus the Web Share API where supported).
- `/reply/:token` (`src/pages/ReplyPage.jsx`) looks up exactly one reply through `public.get_reply_by_token()`, a narrow `security definer` function — same pattern as `get_wish()`. It returns only `sender_name`, `message`, `reaction`, `created_at`; never a database id, never `wish_short_id`, never a list. Anyone holding the token can view that one reply — no public `SELECT` grant was added to `wish_replies`, and admin access is unchanged.
- `/reply/:token` is `noindex,nofollow` and is not in the sitemap. Unlike the immersive `/wish/:id` page, it keeps the normal header/footer, since it's meant to read as an ordinary GiftOfy page.
