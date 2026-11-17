// Sitewide constants. Pure data (no JSX, no imports) so the Vercel edge middleware, the build
// scripts and the React app can all share one source of truth.
export const SITE_URL = 'https://giftofy.vercel.app';
export const BRAND = 'GiftOfy';
export const TAGLINE = 'Create a Wish. Share the Moment. Send a Gift.';

// The person who runs GiftOfy: official display name, exactly as confirmed by the owner. It is used on the About,
// Contact, Privacy and Terms pages and in the footer credit (src/components/Footer.jsx). To change the spelling,
// change it here and in the literal expected by src/App.test.jsx and src/pages/ContentPages.test.jsx.
export const OWNER_NAME = 'Syyed Muhummad Irshad';

export const WHATSAPP_URL = 'https://wa.me/923218100537';
export const WHATSAPP_DISPLAY = '+923218100537';
// Official public contact email, confirmed by the owner. It is shown on the Contact page (as a mailto link), in the
// footer, and in the Privacy Policy, Terms and About pages. Set it to '' to hide it everywhere.
export const CONTACT_EMAIL = 'career@giftofy.vercel.app';

// Existing AdSense publisher id (already in index.html and public/ads.txt). Not a secret.
export const ADSENSE_CLIENT = 'ca-pub-6145547842489065';

// Dates are real editorial dates, shown on pages and used for sitemap <lastmod> / JSON-LD.
export const SITE_LAUNCHED = '2026-10-01';
export const CONTENT_UPDATED = '2026-11-16';
export const POLICY_UPDATED = '2026-11-16';
