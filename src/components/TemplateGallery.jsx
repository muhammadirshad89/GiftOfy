import { Link } from 'react-router-dom';
import { TPL, SMP } from '../data/content.js';
import WishCard from './WishCard.jsx';

export function SampleCard({ t }) {
  const [occ, name, sender, msg] = SMP[t];
  return <WishCard className="sc" tpl={t} occ={occ} name={name} sender={sender} msg={msg} />;
}

export default function TemplateGallery() {
  return (
    <div className="grid tps">
      {TPL.map((t) => (
        <Link key={t.id} to="/create" className={`tc${t.premium ? ' pm' : ''}`}>
          <SampleCard t={t.id} />
          <span className="cap"><b>{t.name}</b><span className={`bd${t.premium ? ' gd' : ''}`}>{t.premium ? '🔒 Premium' : 'Free'}</span></span>
        </Link>
      ))}
    </div>
  );
}
