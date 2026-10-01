import { useState } from 'react';
import { magicFor } from '../data/magic.js';
import FloatingBackground from './FloatingBackground.jsx';
import InteractiveObject from './InteractiveObject.jsx';

/**
 * The recipient's opening screen: a magical full-screen background with the occasion's object
 * in the centre. The object itself is the tap target; a small hint sits below it.
 */
export default function RevealAnimation({ wish: w, onOpen }) {
  const magic = magicFor(w.o);
  const [tapped, setTapped] = useState(false);
  return (
    <div className="magicstage" data-magic-shape={magic.shape} data-occasion={w.o} style={{ '--stage-acc': magic.accent }}>
      <FloatingBackground types={magic.particles} accent={magic.accent} burst={tapped} />
      <div className={`io-intro${tapped ? ' gone' : ''}`}><h2>{w.h ? 'You have received a special surprise.' : magic.prompt}</h2></div>
      <InteractiveObject shape={magic.shape} label={magic.label} accent={magic.accent} onTap={() => setTapped(true)} onOpened={onOpen} />
      {!tapped && <p className="io-hint">{magic.tapHint}</p>}
    </div>
  );
}
