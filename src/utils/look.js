import { OCC } from '../data/content.js';
import { TEMPLATE_MAP } from '../data/templates.js';

/** Turns a template id into the CSS class, CSS variables and decoration a wish needs to render. */
export function lookOf(id, occ) {
  const t = TEMPLATE_MAP[id] || TEMPLATE_MAP.aurora;
  if (t.legacy) {
    const ic = (OCC.find((o) => o.id === occ) || OCC[0]).icon;
    return { cls: `t-${t.id}`, style: undefined, decor: `❤️ ${ic} ${ic}`, anim: 'float', emoji: ic };
  }
  return {
    cls: `tx lo-${t.layout} f-${t.font}`,
    style: { '--wb': `linear-gradient(160deg,${t.bg[0]},${t.bg[1]})`, '--wf': t.fg, '--wa': t.ac },
    decor: t.decor, anim: t.anim, emoji: t.decor.split(' ')[0],
  };
}
