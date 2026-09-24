import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Button from '../components/Button.jsx';
import { isConfigured } from '../lib/supabase.js';
import { getSession, signIn } from '../services/authService.js';
import useSeo from '../utils/useSeo.js';

export default function AdminLoginPage() {
  useSeo({ title: 'Admin login', noindex: true });
  const nav = useNavigate();
  const { state } = useLocation();
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');
  const [err, setErr] = useState('');
  const [busy, setBusy] = useState(false);
  useEffect(() => { getSession().then((s) => { if (s) nav('/admin', { replace: true }); }); }, [nav]);

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true); setErr('');
    try { await signIn(email.trim(), pw); nav('/admin', { replace: true }); }
    catch (x) { setErr(x.message); } finally { setBusy(false); }
  };
  return (
    <section className="wrap narrow">
      <div className="wcard">
        <h1 className="h2">Admin login</h1>
        {state?.expired && <p className="err" role="alert">Your session has ended. Please sign in again.</p>}
        {!isConfigured && <p className="err" role="alert">Admin sign-in isn’t configured on this deployment.</p>}
        <form onSubmit={submit}>
          <label>Email<input type="email" value={email} autoComplete="username" required onChange={(e) => setEmail(e.target.value)} /></label>
          <label>Password<input type="password" value={pw} autoComplete="current-password" required onChange={(e) => setPw(e.target.value)} /></label>
          {err && <p className="err" role="alert">{err}</p>}
          <Button type="submit" disabled={busy || !isConfigured}>{busy ? 'Signing in…' : 'Sign in'}</Button>
        </form>
      </div>
    </section>
  );
}
