import { OCC } from '../data/content.js';
import Button from './Button.jsx';
import { Floaties } from './WishCard.jsx';

/** The recipient's opening screen. Surprise mode hides the sender until "Reveal". */
export default function RevealAnimation({ wish: w, onOpen }) {
  const o = OCC.find((x) => x.id === w.o) || OCC[0];
  return (
    <div className={`stage t-${w.t}`}>
      <Floaties icon={o.icon} />
      <div className="card-in intro">
        <div className="big" aria-hidden="true">🎁</div>
        <h2>{w.h ? 'You have received a special surprise.' : `${w.s || 'Someone'} made something special for you ❤️`}</h2>
        <Button onClick={onOpen}>{w.h ? 'Reveal Message' : 'Open'}</Button>
      </div>
    </div>
  );
}
