import { useParams, useSearchParams } from 'react-router-dom';
import CreateWishWizard from '../components/CreateWishWizard.jsx';
import { OCC } from '../data/content.js';
import { TEMPLATE_MAP } from '../data/templates.js';
import { META_BY_PATH } from '../data/pageMeta.js';
import useSeo from '../utils/useSeo.js';

export default function CreateWishPage() {
  const { occ } = useParams();
  const [sp] = useSearchParams();
  const valid = OCC.some((o) => o.id === occ) ? occ : undefined;
  const t = TEMPLATE_MAP[sp.get('t')];
  const tpl = t && !t.premium ? t.id : undefined;
  const m = (sp.get('m') || '').trim().slice(0, 500) || undefined; // sample message from a content page; length-capped, rendered as plain text
  // /create/:occasion is the same wizard as /create, so it canonicalizes to /create (see src/seo/routes.js).
  useSeo({ title: META_BY_PATH['/create'].title, description: META_BY_PATH['/create'].desc, path: '/create' });
  return <CreateWishWizard key={`${valid}-${tpl}-${m}`} initialOcc={valid} initialTpl={tpl} initialMsg={valid ? m : undefined} />;
}
