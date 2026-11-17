import { Link } from 'react-router-dom';
import Breadcrumbs from '../components/Breadcrumbs.jsx';
import Button from '../components/Button.jsx';
import JsonLd from '../components/JsonLd.jsx';
import { OCC } from '../data/content.js';
import { META_BY_PATH, byGroup } from '../data/pageMeta.js';
import { breadcrumbLd, collectionLd } from '../seo/jsonld.js';
import { formatDate } from '../seo/format.js';
import useSeo from '../utils/useSeo.js';

const Cards = ({ items, icons }) => (
  <ul className="rel">
    {items.map((p) => {
      const o = icons && OCC.find((x) => x.id === p.occ);
      return <li key={p.path}><Link to={p.path}><b>{o ? `${o.icon} ` : ''}{p.h1}</b><span>{p.desc}</span></Link></li>;
    })}
  </ul>
);

/** /wishes (occasions + recipients) and /guides: real navigation hubs that link to every content page. */
export default function HubPage({ k }) {
  const meta = META_BY_PATH[`/${k}`];
  useSeo({ title: meta.title, description: meta.desc, path: meta.path });
  const trail = [['Home', '/'], [meta.h1, meta.path]];
  const items = k === 'wishes' ? [...byGroup('occasion'), ...byGroup('recipient')] : byGroup('guide');
  return (
    <section className="wrap article seo">
      <Breadcrumbs trail={trail} />
      <h1>{meta.h1}</h1>
      <p className="byline">Updated <time dateTime={meta.updated}>{formatDate(meta.updated)}</time></p>
      {k === 'wishes' ? (
        <>
          <p className="lead">Find words for any moment. Each page below has sample messages grouped by tone, advice on choosing and adapting them, and a free way to turn your message into a personalized digital wish.</p>
          <h2 id="occasions">Wishes by occasion</h2>
          <p>Start here if you know the event: a birthday, a wedding, a festival or a thank-you.</p>
          <Cards items={byGroup('occasion')} icons />
          <h2 id="recipients">Messages for someone specific</h2>
          <p>Start here if you know the person but not the occasion. These pages focus on the relationship: what to say, what to avoid and how to say it when the relationship is warm, distant or complicated.</p>
          <Cards items={byGroup('recipient')} />
          <h2>Not sure what to write?</h2>
          <p>Read <Link to="/guides/how-to-write-a-heartfelt-message">how to write a heartfelt message</Link>, or see <Link to="/guides">all guides</Link>. When you are ready, <Link to="/create">create a wish</Link>.</p>
        </>
      ) : (
        <>
          <p className="lead">Practical, plain-language guides on writing messages that sound sincere, sending digital greetings well and making distant celebrations feel close.</p>
          <Cards items={items} />
          <h2>Looking for message ideas?</h2>
          <p>Browse <Link to="/wishes">wishes by occasion and recipient</Link>, or <Link to="/create">create a wish</Link> now.</p>
        </>
      )}
      <div className="cta"><h2>Make Someone Smile Today</h2><p>It takes about two minutes, and it is free.</p><Button to="/create">Create a Wish</Button></div>
      <JsonLd data={breadcrumbLd(trail)} />
      <JsonLd data={collectionLd(meta, items)} />
    </section>
  );
}
