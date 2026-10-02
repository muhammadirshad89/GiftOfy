import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { magicFor } from '../data/magic.js';
import { wishUrl } from '../services/wishService.js';
import Button from './Button.jsx';
import FloatingBackground from './FloatingBackground.jsx';
import ReplyForm from './ReplyForm.jsx';
import ShareButtons from './ShareButtons.jsx';
import WishCard from './WishCard.jsx';

/** The full wish after the recipient taps the interactive object: staggered reveal, closing line,
 * a reply form, sharing, and a replay of the whole surprise (onReplay resets WishPage's `open` state). */
export default function WishReveal({ wish: w, shortId, onReplay }) {
  const magic = magicFor(w.o);
  const [burst, setBurst] = useState(true); // confetti wave right after the pop, then calm
  useEffect(() => { const t = setTimeout(() => setBurst(false), 2800); return () => clearTimeout(t); }, []);
  const url = wishUrl(shortId);
  return (
    <div className="magicstage" data-magic-shape={magic.shape} data-occasion={w.o} style={{ '--stage-acc': magic.accent }}>
      <FloatingBackground types={magic.particles} accent={magic.accent} burst={burst} />
      <div className="wr-wrap">
        <div className="reveal-in d1"><WishCard className="wr" tpl={w.t} occ={w.o} name={w.n} sender={w.s} msg={w.m} /></div>
        <div className="reveal-in d3 closing">
          <p className="closing-lead">One little thing before you go... ✨</p>
          <p>{magic.closing}</p>
        </div>
        <div className="reveal-in d4">
          <div className="row after" style={{ marginTop: 18 }}>
            <Button variant="ghost" onClick={onReplay}>Replay the Surprise ✨</Button>
            <Button variant="ghost" to="/create">Create a Wish for Someone Special ✨</Button>
            <Link className="mw" to="/">Made with GiftOfy</Link>
          </div>
          <div className="share-block">
            <p className="share-lead">Share this Wish 💌</p>
            <ShareButtons id={shortId} url={url} showPreviewLink={false} />
          </div>
          <ReplyForm shortId={shortId} />
        </div>
      </div>
    </div>
  );
}
