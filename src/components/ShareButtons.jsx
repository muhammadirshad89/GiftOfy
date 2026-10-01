import { useState } from 'react';
import Button from './Button.jsx';
import { SHARE_TEXT, whatsappUrl } from '../services/wishService.js';

const facebookUrl = (url) => `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;

/** showPreviewLink is for the sender's own publish screen; the recipient reusing this to share
 * onward doesn't need a link back to their own wish as if it were someone else's. */
export default function ShareButtons({ id, url, showPreviewLink = true }) {
  const [copyLabel, setCopyLabel] = useState('Copy link');
  const copy = async () => {
    try { await navigator.clipboard.writeText(url); setCopyLabel('Copied ✓'); } catch { setCopyLabel('Press Ctrl/Cmd+C'); }
  };
  const share = () => navigator.share({ title: 'A special wish for you', text: SHARE_TEXT, url }).catch(() => {});
  return (
    <div className="row">
      <Button variant="wa" href={whatsappUrl(url)} target="_blank" rel="noopener noreferrer">Share on WhatsApp</Button>
      <Button variant="ghost" href={facebookUrl(url)} target="_blank" rel="noopener noreferrer">Share on Facebook</Button>
      <Button variant="ghost" onClick={copy} aria-live="polite">{copyLabel}</Button>
      {navigator.share && <Button variant="ghost" onClick={share}>Share…</Button>}
      {showPreviewLink && <Button variant="ghost" to={`/wish/${id}`}>Preview as recipient</Button>}
      {navigator.share && <small className="mut">On your phone, “Share…” lets you send it to WhatsApp, Instagram or any app.</small>}
    </div>
  );
}
