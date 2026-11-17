import { useState } from 'react';
import { Link } from 'react-router-dom';
import { fill } from '../data/stats.js';

/**
 * Renders page bodies written as data (see src/data/content/*.js).
 * A section is [heading, [blocks]]. A block is a string (paragraph) or one of:
 *   ['ul'|'ol', [items]]   ['msgs', [sample messages]]   ['h3', text]   ['tip', text]   ['table', [header, ...rows]]
 * Inline markup inside any string: **bold** and [label](/internal-path or https://external).
 * Tokens {occasions} and {templates} are replaced with the live catalog counts.
 */
const TOKEN = /(\[[^\]]+\]\([^)]+\)|\*\*[^*]+\*\*)/g;

export function Inline({ text }) {
  return fill(text).split(TOKEN).map((part, i) => {
    const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (link) {
      const [, label, url] = link;
      if (url.startsWith('/')) return <Link key={i} to={url}>{label}</Link>;
      if (url.startsWith('mailto:')) return <a key={i} href={url}>{label}</a>;
      return <a key={i} href={url} target="_blank" rel="noopener noreferrer">{label}</a>;
    }
    const bold = part.match(/^\*\*([^*]+)\*\*$/);
    return bold ? <strong key={i}>{bold[1]}</strong> : part;
  });
}

export const slugify = (h) => h.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

/** One sample message with Copy and "Use in a wish" (prefills the create wizard). */
function Msg({ text, occ }) {
  const [label, setLabel] = useState('Copy');
  const copy = async () => {
    try { await navigator.clipboard.writeText(text); setLabel('Copied ✓'); } catch { setLabel('Press Ctrl/Cmd+C'); }
    setTimeout(() => setLabel('Copy'), 2200);
  };
  return (
    <li>
      <span>{text}</span>
      <span className="macts">
        <button type="button" className="lnk" onClick={copy} aria-label="Copy this message">{label}</button>
        {occ && <Link className="lnk" to={`/create/${occ}?m=${encodeURIComponent(text)}`} aria-label="Use this message in a wish">Use in a wish</Link>}
      </span>
    </li>
  );
}

export function Blocks({ blocks, occ }) {
  return blocks.map((b, i) => {
    if (typeof b === 'string') return <p key={i}><Inline text={b} /></p>;
    const [type, v] = b;
    if (type === 'ul') return <ul key={i} className="plist">{v.map((x) => <li key={x}><Inline text={x} /></li>)}</ul>;
    if (type === 'ol') return <ol key={i} className="plist">{v.map((x) => <li key={x}><Inline text={x} /></li>)}</ol>;
    if (type === 'msgs') return <ul key={i} className="seo-msgs">{v.map((m) => <Msg key={m} text={m} occ={occ} />)}</ul>;
    if (type === 'h3') return <h3 key={i}>{v}</h3>;
    if (type === 'tip') return <p key={i} className="tipbox"><Inline text={v} /></p>;
    if (type === 'table') {
      const [head, ...rows] = v;
      return (
        <div key={i} className="tw">
          <table className="ct">
            <thead><tr>{head.map((h, j) => <th key={j} scope="col">{h}</th>)}</tr></thead>
            <tbody>{rows.map((r) => <tr key={r[0] + r[1]}>{r.map((c, j) => (j === 0 ? <th key={j} scope="row">{c}</th> : <td key={j}>{c}</td>))}</tr>)}</tbody>
          </table>
        </div>
      );
    }
    return null;
  });
}

export default function Prose({ sections, occ }) {
  return sections.map(([h, blocks]) => (
    <section key={h} id={slugify(h)} className="psec"><h2>{h}</h2><Blocks blocks={blocks} occ={occ} /></section>
  ));
}
