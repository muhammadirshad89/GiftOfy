// Structured-data builders. Pure functions returning plain objects; components serialize them.
import { SITE_URL, BRAND } from '../data/siteConfig.js';

/** "[label](/path)" -> "label", "**bold**" -> "bold" (for JSON-LD text and plain-text uses). */
export const plain = (t) => String(t).replace(/\[([^\]]+)\]\([^)]+\)/g, '$1').replace(/\*\*([^*]+)\*\*/g, '$1');

export const breadcrumbLd = (trail) => ({
  '@context': 'https://schema.org', '@type': 'BreadcrumbList',
  itemListElement: trail.map(([name, path], i) => ({ '@type': 'ListItem', position: i + 1, name, item: `${SITE_URL}${path}` })),
});

export const faqLd = (faqs) => ({
  '@context': 'https://schema.org', '@type': 'FAQPage',
  mainEntity: faqs.map(([q, a]) => ({ '@type': 'Question', name: plain(q), acceptedAnswer: { '@type': 'Answer', text: plain(a) } })),
});

export const articleLd = (meta) => ({
  '@context': 'https://schema.org', '@type': 'Article',
  headline: meta.h1, description: meta.desc, inLanguage: 'en',
  datePublished: meta.created, dateModified: meta.updated,
  mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE_URL}${meta.path}` },
  image: `${SITE_URL}/og-default.png`,
  author: { '@type': 'Organization', name: BRAND, url: `${SITE_URL}/` },
  publisher: { '@type': 'Organization', name: BRAND, url: `${SITE_URL}/`, logo: { '@type': 'ImageObject', url: `${SITE_URL}/logo-512.png` } },
});

export const collectionLd = (meta, items) => ({
  '@context': 'https://schema.org', '@type': 'CollectionPage',
  name: meta.h1, description: meta.desc, url: `${SITE_URL}${meta.path}`, inLanguage: 'en',
  mainEntity: { '@type': 'ItemList', itemListElement: items.map((it, i) => ({ '@type': 'ListItem', position: i + 1, name: it.h1, url: `${SITE_URL}${it.path}` })) },
});
