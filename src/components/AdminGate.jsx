import { useEffect, useRef, useState } from 'react';
import { Navigate } from 'react-router-dom';
import Button from './Button.jsx';
import { getSession, isAdmin, onAuthChange, signOut } from '../services/authService.js';

/** Renders children only for a signed-in admin. The real protection is RLS; this is the UX layer. */
export default function AdminGate({ children }) {
  const [status, setStatus] = useState('loading'); // loading | anon | denied | error | ok
  const wasOk = useRef(false);
  useEffect(() => {
    let live = true;
    const check = async () => {
      const session = await getSession();
      if (!live) return;
      if (!session) return setStatus('anon');
      try { const ok = await isAdmin(); if (live) { wasOk.current = wasOk.current || ok; setStatus(ok ? 'ok' : 'denied'); } }
      catch { if (live) setStatus('error'); }
    };
    check();
    const off = onAuthChange(() => check());
    return () => { live = false; off(); };
  }, []);

  if (status === 'loading') return <p className="wrap c" role="status">Checking your session…</p>;
  if (status === 'anon') return <Navigate to="/admin/login" replace state={{ expired: wasOk.current }} />;
  if (status === 'ok') return children;
  return (
    <section className="wrap narrow c">
      <h1 className="h2">{status === 'denied' ? 'Your account doesn’t have admin access.' : 'We couldn’t verify your admin access.'}</h1>
      <p className="lead">{status === 'denied' ? 'Sign in with an authorized admin account.' : 'Please try again in a moment.'}</p>
      <Button variant="ghost" onClick={() => signOut()}>Sign out</Button>
    </section>
  );
}
