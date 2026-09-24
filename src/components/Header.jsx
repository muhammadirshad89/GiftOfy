import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Button from './Button.jsx';

export function Logo() {
  return (
    <Link className="logo" to="/" aria-label="GiftOfy home">
      <svg className="lm" viewBox="0 0 32 32" aria-hidden="true"><rect width="32" height="32" rx="10" fill="#6C3BFF" /><path d="M7 14h18v11a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2z" fill="#fff" /><rect x="5" y="10" width="22" height="5" rx="2" fill="#fff" /><path d="M14 10h4v17h-4z" fill="#FF4F9A" /><path d="M16 10c-4-1-6-5-3.5-6.2 2.2-1 3.5 2.4 3.5 6.2zm0 0c4-1 6-5 3.5-6.2-2.2-1-3.5 2.4-3.5 6.2z" fill="#FFD166" /></svg>
      Gift<span>O</span>fy
    </Link>
  );
}

export default function Header() {
  const [open, setOpen] = useState(false);
  const loc = useLocation();
  useEffect(() => { setOpen(false); }, [loc]);
  return (
    <header id="hdr">
      <div className="hin">
        <Logo />
        <nav id="nav" className={open ? 'open' : ''} aria-label="Main">
          <Link to="/">Home</Link>
          <Link to="/create">Create a Wish</Link>
          <Link to="/#occasions">Occasions</Link>
          <Link to="/#how">How It Works</Link>
          <Button to="/create" className="mcta">Create Your Wish ❤️</Button>
        </nav>
        <Button to="/create" size="sm" className="hcta">Create Your Wish ❤️</Button>
        <button className="burger" aria-expanded={open} aria-controls="nav" aria-label="Menu" onClick={() => setOpen((o) => !o)}><i /><i /><i /></button>
      </div>
    </header>
  );
}
