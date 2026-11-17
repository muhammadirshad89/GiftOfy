import { Link } from 'react-router-dom';
import AdSlot from '../components/AdSlot.jsx';
import Breadcrumbs from '../components/Breadcrumbs.jsx';
import Button from '../components/Button.jsx';
import GiftofyBlock from '../components/GiftofyBlock.jsx';
import JsonLd from '../components/JsonLd.jsx';
import Prose, { Inline, slugify } from '../components/Prose.jsx';
import RecipientCtas from '../components/RecipientCtas.jsx';
import { OCC, WA } from '../data/content.js';
import { META_BY_KEY } from '../data/pageMeta.js';
import { CONTACT_EMAIL, POLICY_UPDATED } from '../data/siteConfig.js';
import { articleLd, breadcrumbLd, faqLd } from '../seo/jsonld.js';
import { formatDate } from '../seo/format.js';
import useSeo from '../utils/useSeo.js';
import NotFoundPage from './NotFoundPage.jsx';

const trailFor = (meta) => {
  const home = ['Home', '/'];
  if (meta.group === 'guide') return [home, ['Guides', '/guides'], [meta.h1, meta.path]];
  if (meta.group === 'occasion' || meta.group === 'recipient') return [home, ['Wishes & messages', '/wishes'], [meta.h1, meta.path]];
  return [home, [meta.h1, meta.path]];
};

/** Shared template for every content page: occasion, recipient, guide and the About/FAQ/legal pages. */
export default function ContentPage({ meta, body }) {
  useSeo({ title: meta?.title, description: meta?.desc, path: meta?.path });
  if (!meta || !body) return <NotFoundPage />;
  const isArticle = ['occasion', 'recipient', 'guide'].includes(meta.group);
  const isLegal = meta.group === 'legal';
  const occ = meta.occ && OCC.find((o) => o.id === meta.occ);
  const trail = trailFor(meta);
  const related = (body.related || []).map((k) => META_BY_KEY[k]).filter(Boolean);
  const showToc = isArticle && body.sections.length >= 4;
  const isContact = meta.path === '/contact';

  return (
    <article className="wrap article seo">
      <Breadcrumbs trail={trail} />
      <h1>{meta.group === 'occasion' && occ ? `${occ.icon} ` : ''}{meta.h1}</h1>
      <p className="byline">
        {isLegal || !isArticle ? 'Last updated' : 'By GiftOfy · Updated'} <time dateTime={isLegal ? POLICY_UPDATED : meta.updated}>{formatDate(isLegal ? POLICY_UPDATED : meta.updated)}</time>
      </p>
      <p className="lead"><Inline text={body.lead} /></p>
      {isArticle && meta.occ && meta.group !== 'guide' && <div className="row l"><Button to={`/create/${meta.occ}`}>Create a {occ?.title || ''} wish</Button></div>}
      {isContact && (
        <div className="row l">
          <Button variant="wa" href={WA} target="_blank" rel="noopener noreferrer">Message us on WhatsApp</Button>
          {CONTACT_EMAIL && <Button variant="ghost" href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</Button>}
        </div>
      )}

      {showToc && (
        <nav className="toc" aria-label="On this page">
          <b>On this page</b>
          <ol>{body.sections.map(([h]) => <li key={h}><a href={`#${slugify(h)}`}>{h}</a></li>)}<li><a href="#faq-heading">Frequently asked questions</a></li></ol>
        </nav>
      )}

      <Prose sections={body.sections} occ={meta.group === 'guide' ? undefined : meta.occ} />

      {meta.group === 'occasion' && <GiftofyBlock occ={meta.occ} noDedicated={meta.path === '/christmas-wishes'} />}
      {meta.group === 'recipient' && body.ctas && <RecipientCtas ctas={body.ctas} />}
      {meta.group === 'guide' && (
        <section className="gblock"><h2>Try it yourself</h2><p>Create a personalized wish in about two minutes. It is free and needs no account.</p><div className="row l"><Button to="/create">Create a Wish</Button><Link className="chip" to="/how-it-works">How it works</Link></div></section>
      )}

      {body.faqs?.length > 0 && (
        <section className="psec" aria-labelledby="faq-heading">
          <h2 id="faq-heading">Frequently asked questions</h2>
          {body.faqs.map(([q, a]) => <details key={q}><summary>{q}</summary><p><Inline text={a} /></p></details>)}
        </section>
      )}

      {isArticle && <AdSlot />}

      {related.length > 0 && (
        <section className="psec" aria-labelledby="rel-heading">
          <h2 id="rel-heading">Related pages</h2>
          <ul className="rel">{related.map((r) => <li key={r.path}><Link to={r.path}><b>{r.h1}</b><span>{r.desc}</span></Link></li>)}</ul>
        </section>
      )}

      <JsonLd data={breadcrumbLd(trail)} />
      {isArticle && <JsonLd data={articleLd(meta)} />}
      {body.faqs?.length > 0 && <JsonLd data={faqLd(body.faqs)} />}
    </article>
  );
}
