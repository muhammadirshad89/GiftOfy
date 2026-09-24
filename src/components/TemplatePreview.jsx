import { useEffect } from 'react';
import Button from './Button.jsx';
import WishCard from './WishCard.jsx';

/** Full-size preview of a template with the sender's real name (or a sample). */
export default function TemplatePreview({ t, name, onClose, onUse }) {
  useEffect(() => {
    const k = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', k);
    return () => window.removeEventListener('keydown', k);
  }, [onClose]);
  const n = name || 'Ayesha';
  return (
    <div className="mdl" role="dialog" aria-modal="true" aria-label={`${t.title} preview`} onClick={onClose}>
      <div className="box" onClick={(e) => e.stopPropagation()}>
        <WishCard className="pv" floaties tpl={t.id} occ={t.occ} name={n} sender="Sara" msg={t.msg.replaceAll('{n}', n)} />
        <div className="row">
          <Button variant="ghost" onClick={onClose} autoFocus>Close</Button>
          <Button onClick={onUse} disabled={t.premium}>{t.premium ? 'Premium: coming later' : 'Use this design'}</Button>
        </div>
      </div>
    </div>
  );
}
