import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Button from '../components/Button.jsx';
import { getReplyByToken } from '../services/replyService.js';
import useSeo from '../utils/useSeo.js';
import NotFoundPage from './NotFoundPage.jsx';

const REACTION_LABEL = { love: '❤️ Loved it', smile: '🥰 It made them smile', sweet: '😍 They thought it was so sweet', thankyou: '🤗 They said thank you', laugh: '😂 It made them laugh', amazing: '💖 They thought it was amazing' };
const when = (iso) => new Date(iso).toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' });

/** A natural GiftOfy page (keeps the header/footer, unlike the immersive /wish/:id experience) that
 * reveals exactly one reply, looked up only by its private token. Never indexed, never listable. */
export default function ReplyPage() {
  const { token } = useParams();
  const [reply, setReply] = useState(undefined); // undefined = loading, null = not found
  const [failed, setFailed] = useState(false);
  useSeo({ title: 'A reply to your wish', noindex: true, path: `/reply/${token}` });

  useEffect(() => {
    let live = true;
    setReply(undefined); setFailed(false);
    getReplyByToken(token).then((r) => { if (live) setReply(r); }).catch(() => { if (live) setFailed(true); });
    return () => { live = false; };
  }, [token]);

  if (failed) return <section className="wrap narrow c"><div className="big" aria-hidden="true">🛰️</div><h1>We couldn’t load this reply right now.</h1><p className="lead">Please check your connection and try again.</p><Button onClick={() => window.location.reload()}>Try again</Button></section>;
  if (reply === undefined) return <p className="wrap c" role="status">Loading…</p>;
  if (!reply) return <NotFoundPage message="Oops! This reply link isn’t valid." />;

  return (
    <section className="wrap narrow">
      <div className="wcard reply-card">
        <h1 className="h2">Someone replied to your GiftOfy wish 💌</h1>
        {reply.sender_name && <p className="reply-from">From <b>{reply.sender_name}</b></p>}
        {reply.reaction && REACTION_LABEL[reply.reaction] && <p className="bd">{REACTION_LABEL[reply.reaction]}</p>}
        <p className="reply-msg">{reply.message}</p>
        <p className="mut">{when(reply.created_at)}</p>
      </div>
      <div className="wcard">
        <h2 className="h2">Want to send them a message too?</h2>
        <p className="mut">Create a new wish and share it with them the same way they shared this reply with you.</p>
        <Button to="/create">Create a Wish</Button>
      </div>
    </section>
  );
}
