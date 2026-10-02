import { useMemo, useState } from 'react';
import { OCC } from '../data/content.js';
import { TEMPLATES } from '../data/templates.js';
import Button from './Button.jsx';
import TemplatePreview from './TemplatePreview.jsx';
import WishCard from './WishCard.jsx';

const FILTERS = [['all', 'All'], ['popular', 'Popular'], ['new', 'New'], ['romantic', 'Romantic'], ['cute', 'Cute'], ['elegant', 'Elegant'], ['minimal', 'Minimal'], ['fun', 'Fun']];

/** Browse templates by occasion, style and search; preview before choosing. */
export default function TemplatePicker({ occ, value, name, onSelect }) {
  const [oc, setOc] = useState(occ);
  const [f, setF] = useState('all');
  const [q, setQ] = useState('');
  const [pv, setPv] = useState(null);
  const n = name || 'Ayesha';
  const list = useMemo(() => TEMPLATES.filter((t) =>
    (oc === 'all' || t.occ === oc) &&
    (f === 'all' || (f === 'popular' ? t.pop : f === 'new' ? t.isNew : t.style === f)) &&
    `${t.title} ${t.desc} ${t.style}`.toLowerCase().includes(q.trim().toLowerCase())), [oc, f, q]);
  return (
    <>
      <div className="tfl">
        <select aria-label="Occasion" value={oc} onChange={(e) => setOc(e.target.value)}>
          <option value="all">All occasions</option>
          {OCC.map((o) => <option key={o.id} value={o.id}>{o.icon} {o.title}</option>)}
        </select>
        <input type="search" aria-label="Search templates" placeholder="Search designs" value={q} onChange={(e) => setQ(e.target.value)} />
      </div>
      <div className="chips" role="group" aria-label="Filter by style">
        {FILTERS.map(([id, l]) => <button key={id} className={`chip${f === id ? ' sel' : ''}`} aria-pressed={f === id} onClick={() => setF(id)}>{l}</button>)}
      </div>
      {list.length === 0 ? <p>No designs match. Try another filter.</p> : (
        <div className="grid tgrid">
          {list.map((t) => (
            <div key={t.id} className={`tcell${t.id === value ? ' sel' : ''}`}>
              <button className="tprev" aria-label={`Preview ${t.title}`} onClick={() => setPv(t)}>
                <WishCard className="sc" tpl={t.id} occ={t.occ} name={n} sender="Sara" msg={t.msg.replaceAll('{n}', n)} />
              </button>
              <div className="cap">
                <b>{t.title}</b>
                {t.id === value ? <span className="bd">Selected</span>
                  : t.premium ? <span className="bd gd">🔒 Premium</span>
                  : <Button variant="ghost" size="sm" onClick={() => onSelect(t)}>Select</Button>}
              </div>
              <small>{t.desc}</small>
            </div>
          ))}
        </div>
      )}
      {pv && <TemplatePreview t={pv} name={name} onClose={() => setPv(null)} onUse={() => { onSelect(pv); setPv(null); }} />}
    </>
  );
}
