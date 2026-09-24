import { Link } from 'react-router-dom';
import { TEMPLATES, TEMPLATE_MAP } from '../data/templates.js';
import Button from './Button.jsx';
import WishCard from './WishCard.jsx';

const NAMES = ['Ayesha', 'Sara', 'Ali', 'Zain', 'Hira', 'Ahmed'];

export function SampleCard({ t }) {
  const tp = TEMPLATE_MAP[t];
  const i = TEMPLATES.indexOf(tp);
  const name = NAMES[i % 6];
  return <WishCard className="sc" tpl={t} occ={tp.occ} name={name} sender={NAMES[(i + 1) % 6]} msg={tp.msg.replaceAll('{n}', name)} />;
}

/** Homepage showcase: popular designs. The full catalog lives in the create flow. */
export default function TemplateGallery() {
  return (
    <>
      <div className="grid tps">
        {TEMPLATES.filter((t) => t.pop).slice(0, 8).map((t) => (
          <Link key={t.id} to={`/create/${t.occ}?t=${t.id}`} className="tc">
            <SampleCard t={t.id} />
            <span className="cap"><b>{t.title}</b><span className="bd">Free</span></span>
          </Link>
        ))}
      </div>
      <p className="c"><Button to="/create" variant="ghost">Browse all {TEMPLATES.length} designs</Button></p>
    </>
  );
}
