import { useState } from 'react';

const PIECES = 14;

/**
 * The tap-to-open object on the recipient page: the object itself (balloon, envelope, ring, ...)
 * is the target. The <button> is only there for keyboard/screen-reader access and is fully unstyled
 * (see .iobj in magic.css); nothing button-like is ever drawn. On tap it calls onTap, plays a pop/burst, then calls onOpened.
 */
export default function InteractiveObject({ shape, label, accent, onTap, onOpened }) {
  const [popped, setPopped] = useState(false);
  const go = () => {
    if (popped) return;
    setPopped(true);
    onTap?.(); // lets the screen start its celebration while the pop plays
    const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    setTimeout(onOpened, reduced ? 50 : 950);
  };
  return (
    <button type="button" className={`iobj io-${shape}${popped ? ' popped' : ''}`} style={{ '--acc': accent }} aria-label={label} onClick={go}>
      <span className="io-shape" aria-hidden="true">
        <span className="io-a" /><span className="io-b" /><span className="io-c" /><span className="io-d" />
      </span>
      {popped && (
        <span className="io-burst" aria-hidden="true">
          {Array.from({ length: PIECES }, (_, i) => (
            <i key={i} style={{ '--a': `${Math.round((i * 360) / PIECES) + (i % 2 ? 9 : 0)}deg`, '--d': `${115 + (i % 4) * 42}px` }} />
          ))}
          <b className="io-wave" />
        </span>
      )}
    </button>
  );
}
