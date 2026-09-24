import { OCC } from '../data/content.js';
import { lookOf } from '../utils/look.js';

/** Light decorative motion. 'none' renders nothing; float/fall/twinkle are CSS-only and stop under reduced motion. */
export const Floaties = ({ decor, anim = 'float' }) => {
  if (anim === 'none') return null;
  const d = decor.split(' ');
  const mod = { twinkle: ' tw', fall: ' fa' }[anim] || '';
  return Array.from({ length: 12 }, (_, i) => (
    <i key={i} className={`fl${mod}`} aria-hidden="true"
      style={{ left: `${(i * 83) % 96}%`, ...(anim === 'twinkle' ? { top: `${(i * 37) % 88}%` } : {}), animationDelay: `${(i % 6) * 0.9}s`, fontSize: 16 + (i % 4) * 6 }}>{d[i % d.length]}</i>
  ));
};

/** The wish itself. Used by the gallery (sc), picker/preview (pv) and the recipient page. */
export default function WishCard({ tpl, occ, name, sender, msg, className = '', floaties = false, children }) {
  const o = OCC.find((x) => x.id === occ) || OCC[0];
  const L = lookOf(tpl, occ);
  return (
    <div className={`stage ${className} ${L.cls}`} style={L.style}>
      {floaties && <Floaties decor={L.decor} anim={L.anim} />}
      <div className="card-in" data-e={L.emoji}>
        <h2>{o.head.replace('{n}', name)}</h2>
        <p className="msg">{msg}</p>
        <p className="from">With love,<br /><b>{sender || 'Someone who cares'} ❤️</b></p>
      </div>
      {children}
    </div>
  );
}
