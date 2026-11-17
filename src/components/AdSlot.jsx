import { useEffect } from 'react';
import { ADSENSE_CLIENT } from '../data/siteConfig.js';

// A clean, opt-in home for a single Google AdSense unit. It renders NOTHING unless you deliberately
// set both variables at build time:
//   VITE_ADSENSE_ENABLED=true
//   VITE_ADSENSE_SLOT_CONTENT=<your ad unit's numeric slot id from AdSense>
// It never loads a script by itself (the AdSense loader already lives in index.html) and is only ever
// placed after the main content of public content pages: never above the fold, never in the create
// wizard, the wish reveal, replies or admin. Space is reserved to avoid layout shift.
const ENABLED = import.meta.env.VITE_ADSENSE_ENABLED === 'true';
const SLOT = import.meta.env.VITE_ADSENSE_SLOT_CONTENT;

function Unit({ slot }) {
  useEffect(() => {
    try { (window.adsbygoogle = window.adsbygoogle || []).push({}); } catch { /* ad blockers etc.: ignore */ }
  }, []);
  return (
    <aside className="adslot" aria-label="Advertisement">
      <small>Advertisement</small>
      <ins className="adsbygoogle" style={{ display: 'block' }} data-ad-client={ADSENSE_CLIENT} data-ad-slot={slot} data-ad-format="auto" data-full-width-responsive="true" />
    </aside>
  );
}

export default function AdSlot({ slot = SLOT }) {
  return ENABLED && slot ? <Unit slot={slot} /> : null;
}
