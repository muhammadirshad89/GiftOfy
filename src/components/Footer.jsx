import { Link } from 'react-router-dom';
import { Logo } from './Header.jsx';
import { META_BY_KEY } from '../data/pageMeta.js';
import { CONTACT_EMAIL, OWNER_NAME, WHATSAPP_DISPLAY } from '../data/siteConfig.js';
import { WA } from '../data/content.js';

// Hand-picked (not "first N") so the footer stays a useful, compact map of the site instead of link spam.
// Every key must exist in src/data/pageMeta.js (checked by tests).
const pick = (keys, all) => [...keys.map((k) => [META_BY_KEY[k].short, `/${k}`]), ...(all ? [all] : [])];
const OCCASIONS = pick(['birthday-wishes', 'anniversary-wishes', 'wedding-wishes', 'eid-wishes', 'new-year-wishes', 'graduation-wishes', 'thank-you-messages', 'mothers-day-wishes'], ['All occasions', '/wishes']);
const PEOPLE = pick(['wishes-for-mother', 'wishes-for-father', 'wishes-for-husband', 'wishes-for-wife', 'wishes-for-boyfriend', 'wishes-for-girlfriend', 'wishes-for-sister', 'wishes-for-brother']);
const GUIDES = pick(['guides/how-to-write-a-heartfelt-message', 'guides/how-to-create-personalized-digital-wishes', 'guides/how-to-send-digital-birthday-greetings', 'guides/digital-gifts-vs-greeting-cards', 'guides/how-to-share-a-digital-greeting'], ['All guides', '/guides']);
const COMPANY = pick(['about', 'how-it-works', 'faq', 'editorial-policy', 'contact', 'privacy', 'terms']);

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
          <p>Beautiful digital wishes made for the people who matter most. Create, personalize and share a special moment in seconds. Free, with no account needed.</p>
          <p>Questions or feedback?</p>
          <a className="ftw" href={WA} target="_blank" rel="noopener noreferrer">WhatsApp: {WHATSAPP_DISPLAY}</a>
          {CONTACT_EMAIL && <p><a className="ftm" href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a></p>}
        </div>
        <LinkList title="Occasions" items={OCCASIONS} />
        <LinkList title="For someone special" items={PEOPLE} />
        <LinkList title="Guides" items={GUIDES} />
        <LinkList title="GiftOfy" items={COMPANY} />
      </div>
      <div className="ftb">
        <span>© <span suppressHydrationWarning>{new Date().getFullYear()}</span> GiftOfy</span>
        <span>Designed & Developed by {OWNER_NAME}</span>
      </div>
    </footer>
  );
}
