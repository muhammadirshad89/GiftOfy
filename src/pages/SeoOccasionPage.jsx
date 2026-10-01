import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/Button.jsx';
import { OCC } from '../data/content.js';
import { SEO_PAGES } from '../data/seoPages.js';
import useSeo from '../utils/useSeo.js';
import NotFoundPage from './NotFoundPage.jsx';

/** Adds/removes a single FAQPage JSON-LD script for this page only (valid only while genuinely accurate). */
function useFaqJsonLd(faqs) {
  useEffect(() => {
    if (!faqs?.length) return undefined;
    const el = document.createElement('script');
    el.type = 'application/ld+json';
    el.text = JSON.stringify({
      '@context': 'https://schema.org', '@type': 'FAQPage',
      mainEntity: faqs.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
    });
    document.head.appendChild(el);
    return () => document.head.removeChild(el);
  }, [faqs]);
}

/** One reusable template for every real-search-intent occasion landing page (see src/data/seoPages.js). */
export default function SeoOccasionPage({ slug }) {
  const page = SEO_PAGES.find((p) => p.slug === slug);
  useSeo({ title: page?.h1, description: page ? `${page.intro.slice(0, 140)}…` : undefined, path: `/${slug}` });
  useFaqJsonLd(page?.faqs);
  if (!page) return <NotFoundPage />;
  const occ = OCC.find((o) => o.id === page.occasionId);
  const others = SEO_PAGES.filter((p) => p.slug !== slug).slice(0, 4);

  return (
    <section className="wrap narrow seo">
      <h1>{occ?.icon} {page.h1}</h1>
      <p className="lead">{page.intro}</p>
      <div className="row"><Button to={`/create/${page.occasionId}`}>Create a {occ?.title} Wish</Button></div>

      <h2>{page.h1} you can send today</h2>
      <ul className="seo-msgs">{page.messages.map((m) => <li key={m}>{m}</li>)}</ul>
      <p>Like one of these? <Link to={`/create/${page.occasionId}`}>Turn it into a personalized digital wish</Link> — add the recipient’s name, pick a design, and share it on WhatsApp in under two minutes.</p>

      {page.faqs?.length > 0 && (
        <>
          <h2>Frequently asked questions</h2>
          {page.faqs.map(([q, a]) => <details key={q}><summary>{q}</summary><p>{a}</p></details>)}
        </>
      )}

      <h2>More occasions</h2>
      <div className="row">{others.map((p) => <Link key={p.slug} className="chip" to={`/${p.slug}`}>{p.h1}</Link>)}</div>

      <div className="cta"><h2>Create your own {occ?.title.toLowerCase()} wish</h2><p>Choose a design, write your message, and share a link — free, no account needed.</p><Button to={`/create/${page.occasionId}`}>Create a Wish</Button></div>
    </section>
  );
}
