import Button from '../components/Button.jsx';
import { PAGES, WA } from '../data/content.js';
import useSeo from '../utils/useSeo.js';

/** About, Contact, Privacy and Terms share one layout; copy lives in data/content.js. */
export default function InfoPage({ k }) {
  const [title, text] = PAGES[k];
  useSeo({ title, description: text });
  return (
    <section className="wrap narrow">
      <div className="wcard">
        <h1 className="h2">{title}</h1>
        <p>{text}</p>
        {k === 'contact' && <Button variant="wa" href={WA} target="_blank" rel="noopener noreferrer">WhatsApp us</Button>}
      </div>
    </section>
  );
}
