import { useState } from 'react';
import Button from './Button.jsx';
import { sendReply } from '../services/replyService.js';

const REACTIONS = [['love', '❤️ Love it'], ['smile', '🥰 Made me smile'], ['sweet', '😍 So sweet'], ['thankyou', '🤗 Thank you'], ['laugh', '😂 Made me laugh'], ['amazing', '💖 You’re amazing']];
const MAX = 500;

/** Lets the recipient send a private reply back. There is no reader for the sender yet beyond the
 * admin dashboard (no accounts/notifications in this product), which the confirmation message says. */
export default function ReplyForm({ shortId }) {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [reaction, setReaction] = useState(null);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState('');
  const [sent, setSent] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true); setErr('');
    try { await sendReply(shortId, { senderName: name, message, reaction }); setSent(true); }
    catch (x) { setErr(x.userMessage || 'We couldn’t send your reply. Please try again.'); }
    finally { setBusy(false); }
  };

  if (sent) return <div className="reply sent" role="status"><p>Reply sent successfully 💌</p><p className="mut">Thank you for letting them know.</p></div>;

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
