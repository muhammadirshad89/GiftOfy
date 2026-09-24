import { Link } from 'react-router-dom';
import { Logo } from './Header.jsx';
import { WA } from '../data/content.js';

const QUICK = [['Home', '/'], ['Create a Wish', '/create'], ['Occasions', '/#occasions'], ['How It Works', '/#how']];
const USEFUL = [['About', '/about'], ['Contact', '/contact'], ['Privacy Policy', '/privacy'], ['Terms & Conditions', '/terms']];

const LinkList = ({ title, items }) => (
  <nav aria-label={title}>
    <h2 className="ftt">{title}</h2>
    <ul className="ftl">{items.map(([t, to]) => <li key={to}><Link to={to}>{t}</Link></li>)}</ul>
  </nav>
);

export default function Footer() {
  return (
    <footer id="ftr">
      <div className="ftg">
        <div>
          <Logo />
          <p><b>Create a Wish. Share the Moment. Send a Gift. ❤️</b></p>
          <p>Beautiful digital wishes made for the people who matter most. Create, personalize and share a special moment in seconds.</p>
        </div>
        <LinkList title="Quick Links" items={QUICK} />
        <LinkList title="Useful Links" items={USEFUL} />
        <div>
          <h2 className="ftt">Connect</h2>
          <p>Need a website for your business?</p>
          <a className="ftw" href={WA} target="_blank" rel="noopener noreferrer">WhatsApp: +923218100537</a>
        </div>
      </div>
      <div className="ftb">
        <span>© {new Date().getFullYear()} GiftOfy</span>
        <span>Designed & Developed by Syyed Muhamamd Irshad</span>
      </div>
    </footer>
  );
}
