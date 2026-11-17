import { Link } from 'react-router-dom';
import Button from '../components/Button.jsx';
import Hero from '../components/Hero.jsx';
import JsonLd from '../components/JsonLd.jsx';
import OccasionGrid from '../components/OccasionGrid.jsx';
import TemplateGallery from '../components/TemplateGallery.jsx';
import { META_BY_KEY } from '../data/pageMeta.js';
import { STATS } from '../data/stats.js';
import { faqLd } from '../seo/jsonld.js';
import useSeo from '../utils/useSeo.js';

// Same answers as /faq (keep them in sync). Only things that are true of the product today.
const FAQS = [
  ['Is GiftOfy free?', 'Yes. Every design available today is free, and there is no payment feature. Premium designs are planned for the future, but nothing is sold today.'],
  ['Does the recipient need an account?', 'No. They open the link, tap to reveal the wish, and can send a reply without signing up. You do not need an account to create a wish either.'],
  ['Can the recipient reply?', 'Yes. After opening the wish they can choose a reaction and send a message. They get a private link to that reply, which they can share with you.'],
  ['Who can see my wish?', 'Anyone who has the link. Wish links are not listed on the site and search engines are asked not to index them, so share them only with people you trust.'],
  ['Can I edit a wish after publishing it?', 'No. If you spot a mistake, create a new wish and share the new link. You can preview the wish before publishing.'],
  ['Can I write my own message?', 'Yes, up to 500 characters. You can start from a template message, use built-in suggestions in the tone you choose, or write from scratch.'],
];

const FEATURED = ['birthday-wishes', 'anniversary-wishes', 'wedding-wishes', 'eid-wishes', 'thank-you-messages', 'new-year-wishes', 'graduation-wishes', 'mothers-day-wishes'];
const PEOPLE = ['wishes-for-mother', 'wishes-for-father', 'wishes-for-husband', 'wishes-for-wife', 'wishes-for-sister', 'wishes-for-brother', 'wishes-for-colleagues'];
const GUIDES = ['guides/how-to-write-a-heartfelt-message', 'guides/how-to-send-digital-birthday-greetings', 'guides/digital-gifts-vs-greeting-cards'];

export default function HomePage() {
  useSeo({ path: '/' });
  return (
    <>
      <Hero />
      <section className="wrap" id="occasions"><h2>Pick an occasion</h2><OccasionGrid /></section>
      <section className="wrap"><h2>Designs worth sharing</h2><TemplateGallery /></section>
      <section className="wrap" id="how">
        <h2>How it works</h2>
        <div className="grid how">
          <div className="card"><span className="n">1</span><b>Choose an occasion</b>Birthdays, weddings, Eid, thank-yous and more.</div>
          <div className="card"><span className="n">2</span><b>Create your personal wish</b>Add a name, pick a style and design, then edit the message.</div>
          <div className="card"><span className="n">3</span><b>Share the surprise</b>Send the link on WhatsApp. No account needed to open it.</div>
          <div className="card"><span className="n">4</span><b>They open it</b>A tap-to-open surprise reveals the wish, made just for them.</div>
          <div className="card"><span className="n">5</span><b>They can reply 💌</b>The recipient can send a message straight back to you.</div>
        </div>
        <p className="c"><Link to="/how-it-works">See the full walkthrough</Link></p>
      </section>

      <section className="wrap" id="why">
        <h2>What makes a GiftOfy wish different</h2>
        <div className="grid how">
          <div className="card"><b>{STATS.templates} free designs</b>Across {STATS.occasions} occasions, each with its own opening surprise, such as a balloon, an envelope or a crescent moon.</div>
          <div className="card"><b>Surprise mode</b>Keep your name hidden until the recipient reveals the message, or sign it yourself.</div>
          <div className="card"><b>Private replies</b>Recipients can react and reply. The reply comes back as a private link only they can share.</div>
          <div className="card"><b>No account, no payment</b>You do not sign up, and GiftOfy never asks for payment details.</div>
        </div>
      </section>

      <section className="wrap" id="ideas">
        <h2>Not sure what to write?</h2>
        <p className="lead c">Browse sample messages with advice on tone, then turn any of them into your own wish.</p>
        <ul className="rel">{FEATURED.map((k) => { const p = META_BY_KEY[k]; return <li key={k}><Link to={p.path}><b>{p.h1}</b><span>{p.desc}</span></Link></li>; })}</ul>
        <h3 className="c">Messages for someone special</h3>
        <div className="row">{PEOPLE.map((k) => <Link key={k} className="chip" to={`/${k}`}>{META_BY_KEY[k].short}</Link>)}<Link className="chip" to="/wishes">All wishes &amp; messages</Link></div>
      </section>

      <section className="wrap" id="guides">
        <h2>Guides</h2>
        <ul className="rel">{GUIDES.map((k) => { const p = META_BY_KEY[k]; return <li key={k}><Link to={p.path}><b>{p.h1}</b><span>{p.desc}</span></Link></li>; })}</ul>
        <p className="c"><Link to="/guides">Read all guides</Link></p>
      </section>

      <section className="wrap"><div className="cta"><h2>Make Someone Smile Today ❤️</h2><p>It takes under two minutes, and it&apos;s completely free.</p><Button to="/create">Create a Wish</Button></div></section>

      <section className="wrap narrow">
        <h2>Questions</h2>
        {FAQS.map(([q, a]) => <details key={q}><summary>{q}</summary><p>{a}</p></details>)}
        <p><Link to="/faq">More questions and answers</Link> · <Link to="/about">About GiftOfy</Link></p>
      </section>
      <JsonLd data={faqLd(FAQS)} />
    </>
  );
}
