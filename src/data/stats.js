import { OCC } from './content.js';
import { TEMPLATES } from './templates.js';

/** Live catalog counts, so page copy never drifts from the real number of occasions and designs.
 * `templates` counts only designs a visitor can actually use today (premium-flagged ones are shown locked). */
export const STATS = { occasions: OCC.length, templates: TEMPLATES.filter((t) => !t.premium).length };
export const fill = (text) => String(text).replace(/\{(occasions|templates)\}/g, (_, k) => STATS[k]);
