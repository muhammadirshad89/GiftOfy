import { Link } from 'react-router-dom';
import Button from './Button.jsx';
import { OCC } from '../data/content.js';
import { TEMPLATES } from '../data/templates.js';
import { magicFor } from '../data/magic.js';

const OBJECT = { balloon: 'balloon', hearts: 'pair of hearts', envelope: 'envelope', ring: 'ring', heart: 'heart', gift: 'gift box', moon: 'crescent moon', bouquet: 'bouquet' };
const list = (a) => (a.length < 2 ? a.join('') : `${a.slice(0, -1).join(', ')} and ${a.at(-1)}`);

/**
 * "Send it with GiftOfy" panel. Everything shown is derived from the real catalog (src/data/templates.js,
 * src/data/magic.js), so it can never promise a design or effect that does not exist.
 * noDedicated: the page's occasion has no dedicated GiftOfy occasion (e.g. Christmas) -> say so honestly.
 */
export default function GiftofyBlock({ occ, noDedicated = false }) {
  const o = OCC.find((x) => x.id === occ);
  if (!o) return null;
  const designs = TEMPLATES.filter((t) => t.occ === occ && !t.premium);
  const magic = magicFor(occ);
  const object = OBJECT[magic.shape] || 'surprise';
  return (
    <section className="gblock" id="send-with-giftofy" aria-labelledby="gb-h">
      <h2 id="gb-h">Send it as a GiftOfy wish</h2>
      {noDedicated ? (
        <p>GiftOfy does not have a dedicated Christmas occasion yet. You can still write your own Christmas message and pair it with one of the {designs.length} free “{o.title}” designs ({list(designs.map((d) => d.title))}) or with the Best Wishes design. The heading on the wish will read “{o.title}” or “Best wishes” rather than “Merry Christmas”, and your own message carries the greeting.</p>
      ) : (
        <p>GiftOfy has {designs.length} free {o.title} {designs.length === 1 ? 'design' : 'designs'}: {list(designs.map((d) => d.title))}. When the person opens your link, they tap a {object} to reveal your message, with {list(magic.particles.map((p) => ({ sparkle: 'sparkles', confetti: 'confetti', balloon: 'balloons', petal: 'petals', heart: 'hearts', star: 'stars' }[p] || p)))} drifting behind it.</p>
      )}
      <ol className="plist">
        <li>Choose the occasion and a design, or start with your own message.</li>
        <li>Add their name (and yours, or keep yours hidden until the reveal) and edit the message.</li>
        <li>Preview, publish and share the link. No account is needed, and it is free.</li>
      </ol>
      <div className="row l"><Button to={`/create/${occ}`}>Create a {o.title} wish</Button><Link className="chip" to="/how-it-works">How it works</Link></div>
    </section>
  );
}
