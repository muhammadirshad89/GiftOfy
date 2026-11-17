# GiftOfy v2.0.0: owner, contact and policy update: short report

## Name used (please confirm)
Your message gave two spellings: "Syyed Muhammad Irshad" (first line) and "Syyed **Muhummad** Irshad" (item 2, "exact confirmed spelling").
I used **Syyed Muhummad Irshad**. If that was a typo, change `OWNER_NAME` in `src/data/siteConfig.js` and the literal in
`src/App.test.jsx` and `src/pages/ContentPages.test.jsx`.

## Files changed (10; nothing added or removed)
| File | Change |
|---|---|
| `src/data/siteConfig.js` | `OWNER_NAME` = Syyed Muhummad Irshad; `CONTACT_EMAIL` = career@giftofy.vercel.app |
| `src/components/Footer.jsx` | Credit now reads the name from `OWNER_NAME` (was hard-coded and misspelled). Email already rendered here from `CONTACT_EMAIL`. WhatsApp link unchanged. |
| `src/data/corePages.js` | Email added to About, Contact, Privacy, Terms; policy wording corrected (below) |
| `src/components/Prose.jsx` | `mailto:` links supported in page text (open normally, not in a new tab) |
| `src/data/pageMeta.js` | Contact meta description reworded ("help quickly" removed). No path, structure or registry change. |
| `index.html` | One line: `email` added to the Organization contact point in the JSON-LD. Chatzy lines untouched (verified by diff). |
| `src/App.test.jsx`, `src/pages/ContentPages.test.jsx` | Expect the exact new spelling; new owner/contact/policy tests |
| `src/seo/seo.test.js` | Chatzy test now pins the exact original stylesheet and script tags |
| `docs/IMPLEMENTATION-REPORT.md` | Open items updated (this report is also new in `docs/`) |

Not touched: routing, page registry structure, sitemap, pre-rendering, Supabase code, schema/migrations, design/CSS, ad handling.

## Owner and email
- Name: one constant feeds About, Contact, Privacy, Terms and the footer. A test fails if an old spelling ("Muhamamd", "Syyed Muhammad", "Syyed Irshad") appears anywhere in shipped source.
- Email: shown on the Contact page (button and text, as mailto), in the footer on every page, and in the About, Privacy and Terms contact sentences. The WhatsApp option is kept (button on the Contact page; number and link in the footer).
- **Warning:** `giftofy.vercel.app` is a Vercel subdomain, and you cannot create mail (MX) records for a `vercel.app` domain, so this address can only work if you arranged forwarding some other way. **I cannot verify that it receives mail.** Please send it a test message. If it bounces, set `CONTACT_EMAIL` to a working address (or use a custom domain). A dead contact address hurts trust and an AdSense review.

## Chatzy verification
- The stylesheet and the `<script ... class="chatzy_widget_script" defer>` in `index.html` are **byte-identical** to the original integration in commit `f4911b6`, each present exactly once (compared programmatically).
- Present exactly once in all 46 pre-rendered pages. A test now pins the exact tags.
- Not verifiable here: that the widget loads and reaches its server (no network in my environment). Check on the deployed site.

## Privacy / Terms corrections (checked against code and schema)
Facts from the code: wishes can only be **soft-deleted** (`status = 'deleted'`; the schema says "intentionally NO delete policy"); admins can read replies but **cannot hide or delete them**; permanent erasure is only possible by direct database access.

| Was | Now |
|---|---|
| "If you ask for permanent deletion, we delete the record" | No self-service deletion. Admin can hide a wish or mark it deleted (removed from public view, record kept). Replies cannot be removed with admin tools. Erasure would be manual, by the operator, in the database, and requests are considered under the applicable law. |
| "Replies can take a few days"; "urgent" requests looked at first | No response-time or priority promise. Emergencies go to local emergency services. |
| "We make it unavailable" on request | "We review each request and can make a wish unavailable"; not every request can be promised. |
| "Administrators can hide or delete wishes and replies" | Admin can hide a wish or mark it deleted; replies are read-only for admins. |
| Ads: "will not intentionally show ads to those visitors without [consent]"; "do not intend to show ads inside the reveal" | Removed; replaced by a factual statement that this depends on the AdSense account configuration, and that the policy will be updated if it changes. |
| "Advertising is labelled and kept separate" (Editorial) | "Our content is written independently of any advertising." |
| Children: "we will remove it" | "We will review and, where appropriate, make the content unavailable." |

A test fails if response-time, guaranteed-removal or "we delete the record" promises reappear.

## Tests
`npm test`: see the result stated in the delivery message (20 files). New tests cover: config values, no stale spellings, Contact email + WhatsApp, footer email, Privacy/Terms/About contact details, no unsupported promises, honest deletion wording, exact Chatzy tags.

## Production build
**Not run.** The `node_modules` in your archive contains only Windows Rollup/esbuild binaries and my environment has no network, so `vite build` cannot start here (re-attempted for this update). What I did verify: a stand-in esbuild bundle compiles; the real `scripts/prerender.mjs` pre-rendered all 46 pages (one H1 each, valid JSON-LD, Chatzy present); a local server emulating the middleware served them; Chromium showed no errors or overflow on the Contact page at 390px.
**Please run `npm ci && npm test && npm run build` locally** (expect "wrote 46 pre-rendered pages"). Middleware behavior on Vercel itself can only be confirmed after you deploy (curl checks in section 9 of `docs/IMPLEMENTATION-REPORT.md`).
