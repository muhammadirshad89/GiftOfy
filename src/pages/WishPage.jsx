import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Button from '../components/Button.jsx';
import RevealAnimation from '../components/RevealAnimation.jsx';
import WishCard from '../components/WishCard.jsx';
import { getWishByShortId } from '../services/wishService.js';
import useSeo from '../utils/useSeo.js';
import NotFoundPage from './NotFoundPage.jsx';

export default function WishPage() {
  const { id } = useParams();
  const [wish, setWish] = useState(undefined); // undefined = loading, null = not found
  const [open, setOpen] = useState(false);
  const [failed, setFailed] = useState(false);
  useSeo({ title: 'A special wish for you', noindex: true }); // private wishes stay out of search
  useEffect(() => {
    let live = true;
    console.log('[GiftOfy] WishPage rendered', { id });
    setWish(undefined); setOpen(false); setFailed(false);
    getWishByShortId(id).then((w) => { if (live) setWish(w); }).catch(() => { if (live) setFailed(true); });
    return () => { live = false; };
  }, [id]);

  if (failed) return <section className="wrap narrow c"><div className="big" aria-hidden="true">🛰️</div><h1>We couldn’t load this wish right now.</h1><p className="lead">Please check your connection and try again.</p><Button onClick={() => window.location.reload()}>Try again</Button></section>;
  if (wish === undefined) return <p className="wrap c" role="status">Loading…</p>;
  if (!wish) return <NotFoundPage message="Oops! This wish could not be found." />;
  if (!open) return <RevealAnimation wish={wish} onOpen={() => setOpen(true)} />;
  return (
    <WishCard className="in" floaties tpl={wish.t} occ={wish.o} name={wish.n} sender={wish.s} msg={wish.m}>
      <div className="row after">
        <Button disabled title="Gifting is not available yet">🎁 Open Your Gift · coming soon</Button>
        <Button variant="ghost" to="/create">Create your own wish</Button>
        <Link className="mw" to="/">Made with GiftOfy</Link>
      </div>
    </WishCard>
  );
}
