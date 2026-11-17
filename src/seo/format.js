import { BRAND } from '../data/siteConfig.js';

/** "Birthday Wishes" -> "Birthday Wishes · GiftOfy". Titles that already name the brand are left alone. */
export const titleize = (t, fallback) => (!t ? fallback : t.includes(BRAND) ? t : `${t} · ${BRAND}`);

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
/** '2026-11-14' -> '14 November 2026' (fixed format, so server and client render identical text). */
export function formatDate(iso) {
  const [y, m, d] = iso.split('-').map(Number);
  return `${d} ${MONTHS[m - 1]} ${y}`;
}
