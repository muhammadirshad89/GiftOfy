import { Link } from 'react-router-dom';
import { Logo } from './Header.jsx';
import { WA } from '../data/content.js';
import { SEO_PAGES } from '../data/seoPages.js';

const QUICK = [['Home', '/'], ['Create a Wish', '/create'], ['Occasions', '/#occasions'], ['How It Works', '/#how']];
const USEFUL = [['About', '/about'], ['Contact', '/contact'], ['Privacy Policy', '/privacy'], ['Terms & Conditions', '/terms']];
// A curated subset (not just "first N") so new pages are guaranteed discoverable sitewide without
// depending on their position in src/data/seoPages.js, and without listing all 13 (that would be
// link-spam for a footer). Picked by hand, not alphabetical/array order.
const FOOTER_WISH_SLUGS = ['birthday-wishes', 'anniversary-wishes', 'wedding-wishes', 'eid-wishes', 'new-year-wishes', 'graduation-wishes', 'thank-you-messages', 'miss-you-messages'];
const WISHES = FOOTER_WISH_SLUGS.map((slug) => SEO_PAGES.find((p) => p.slug === slug)).filter(Boolean).map((p) => [p.h1, `/${p.slug}`]);

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
        <LinkList title="Wishes & Messages" items={WISHES} />
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
