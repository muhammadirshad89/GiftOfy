import { Link } from 'react-router-dom';
import Button from './Button.jsx';

/** For recipient pages: create-a-wish links for the occasions most relevant to that person. */
export default function RecipientCtas({ ctas }) {
  return (
    <section className="gblock" id="send-with-giftofy" aria-labelledby="rc-h">
      <h2 id="rc-h">Turn your message into a GiftOfy wish</h2>
      <p>Write your message, choose a design and share a link. The person opens it with a tap and can send you a private reply. It is free and needs no account. Choose the occasion that fits:</p>
      <div className="row l">{ctas.map(([id, label], i) => (i === 0 ? <Button key={id} to={`/create/${id}`}>{label} wish</Button> : <Link key={id} className="chip" to={`/create/${id}`}>{label}</Link>))}</div>
    </section>
  );
}
