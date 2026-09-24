import { OCC } from '../data/content.js';

export const Floaties = ({ icon }) => Array.from({ length: 12 }, (_, i) => (
  <i key={i} className="fl" aria-hidden="true" style={{ left: `${(i * 83) % 96}%`, animationDelay: `${(i % 6) * 0.9}s`, fontSize: 16 + (i % 4) * 6 }}>{i % 3 ? icon : '❤️'}</i>
));

/** The wish itself. Used in the gallery (sc), wizard (mini, pv) and recipient page. */
export default function WishCard({ tpl, occ, name, sender, msg, className = '', floaties = false, children }) {
  const o = OCC.find((x) => x.id === occ) || OCC[0];
  return (
    <div className={`stage ${className} t-${tpl}`}>
      {floaties && <Floaties icon={o.icon} />}
      <div className="card-in">
        <h2>{o.head.replace('{n}', name)}</h2>
        <p className="msg">{msg}</p>
        <p className="from">With love,<br /><b>{sender || 'Someone who cares'} ❤️</b></p>
      </div>
      {children}
    </div>
  );
}
