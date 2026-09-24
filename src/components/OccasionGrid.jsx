import { Link } from 'react-router-dom';
import { OCC } from '../data/content.js';

/** With onPick: selectable buttons (wizard). Without: links into /create/:occasion. */
export default function OccasionGrid({ onPick, selected }) {
  return (
    <div className="grid occ">
      {OCC.map((o, i) => {
        const style = { '--h': [265, 335, 42][i % 3] };
        const inner = <><span className="ic">{o.icon}</span>{o.title}</>;
        return onPick
          ? <button key={o.id} style={style} className={`card${o.id === selected ? ' sel' : ''}`} aria-pressed={o.id === selected} onClick={() => onPick(o.id)}>{inner}</button>
          : <Link key={o.id} style={style} className="card" to={`/create/${o.id}`}>{inner}</Link>;
      })}
    </div>
  );
}
