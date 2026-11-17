/** Emits one JSON-LD script. Rendered inside the page body (valid anywhere), so it is part of the pre-rendered HTML. */
export default function JsonLd({ data }) {
  // "<" is escaped so a stray "</script>" inside text can never close the tag early.
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }} />;
}
