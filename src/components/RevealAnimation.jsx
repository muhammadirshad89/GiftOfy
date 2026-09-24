import Button from './Button.jsx';
import { Floaties } from './WishCard.jsx';
import { lookOf } from '../utils/look.js';

/** The recipient's opening screen. Surprise mode hides the sender until "Reveal". */
export default function RevealAnimation({ wish: w, onOpen }) {
  const L = lookOf(w.t, w.o);
  return (
    <div className={`stage ${L.cls}`} style={L.style}>
      <Floaties decor={L.decor} anim={L.anim} />
      <div className="card-in intro" data-e={L.emoji}>
        <div className="big" aria-hidden="true">🎁</div>
        <h2>{w.h ? 'You have received a special surprise.' : `${w.s || 'Someone'} made something special for you ❤️`}</h2>
        <Button onClick={onOpen}>{w.h ? 'Reveal Message' : 'Open'}</Button>
      </div>
    </div>
  );
}
