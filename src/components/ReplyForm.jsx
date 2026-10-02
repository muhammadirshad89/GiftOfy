import { useState } from 'react';
import Button from './Button.jsx';
import { sendReply, replyUrl, whatsappReplyUrl } from '../services/replyService.js';

const REACTIONS = [['love', '❤️ Love it'], ['smile', '🥰 Made me smile'], ['sweet', '😍 So sweet'], ['thankyou', '🤗 Thank you'], ['laugh', '😂 Made me laugh'], ['amazing', '💖 You’re amazing']];
const MAX = 500;

/** Shown once the reply is saved: a private link back to it, which the recipient can hand to
 * whoever sent the original wish — that's the only way the sender ever sees a reply today. */
function ReplySent({ token }) {
  const url = replyUrl(token);
  const [copyLabel, setCopyLabel] = useState('Copy Private Link');
  const copy = async () => {
    try { await navigator.clipboard.writeText(url); setCopyLabel('Copied ✓'); } catch { setCopyLabel('Press Ctrl/Cmd+C'); }
  };
  const share = () => navigator.share({ title: 'A reply to your GiftOfy wish', text: 'Someone replied to your GiftOfy wish 💌', url }).catch(() => {});
  return (
    <div className="reply sent" role="status">
      <p className="big-ok">Your reply has been sent ❤️</p>
      <p className="mut">Want to share your reply with the person who sent you this wish?</p>
      <div className="row">
        <Button variant="wa" href={whatsappReplyUrl(url)} target="_blank" rel="noopener noreferrer">Share on WhatsApp</Button>
        <Button variant="ghost" onClick={copy}>{copyLabel}</Button>
        {navigator.share && <Button variant="ghost" onClick={share}>Share…</Button>}
      </div>
    </div>
  );
}

/** Lets the recipient send a private reply back. */
export default function ReplyForm({ shortId }) {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [reaction, setReaction] = useState(null);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState('');
  const [token, setToken] = useState(null);

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true); setErr('');
    try { setToken(await sendReply(shortId, { senderName: name, message, reaction })); }
    catch (x) { setErr(x.userMessage || 'We couldn’t send your reply. Please try again.'); }
    finally { setBusy(false); }
  };

  if (token) return <ReplySent token={token} />;

  return (
    <form className="reply" onSubmit={submit}>
      <h2>Send a Reply 💌</h2>
      <div className="react" role="group" aria-label="Quick reaction">
        {REACTIONS.map(([id, label]) => (
          <button key={id} type="button" className={reaction === id ? 'picked' : ''} aria-pressed={reaction === id} onClick={() => setReaction(reaction === id ? null : id)}>{label}</button>
        ))}
      </div>
      <label>Your name <small>(optional)</small><input value={name} maxLength={40} autoComplete="off" onChange={(e) => setName(e.target.value)} /></label>
      <label>Your message<textarea rows={4} maxLength={MAX} value={message} placeholder="Write a reply…" onChange={(e) => setMessage(e.target.value)} /></label>
      <div className="cnt"><span aria-live="polite">{message.length}/{MAX}</span></div>
      {err && <p className="err" role="alert">{err}</p>}
      <Button type="submit" disabled={busy || !message.trim()}>{busy ? 'Sending…' : 'Send Reply'}</Button>
    </form>
  );
}
