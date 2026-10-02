import { useParams, useSearchParams } from 'react-router-dom';
import CreateWishWizard from '../components/CreateWishWizard.jsx';
import { OCC } from '../data/content.js';
import { TEMPLATE_MAP } from '../data/templates.js';
import useSeo from '../utils/useSeo.js';

export default function CreateWishPage() {
  const { occ } = useParams();
  const [sp] = useSearchParams();
  const valid = OCC.some((o) => o.id === occ) ? occ : undefined;
  const t = TEMPLATE_MAP[sp.get('t')];
  const tpl = t && !t.premium ? t.id : undefined;
  useSeo({ title: 'Create a Wish', description: 'Create a personalized digital wish in under two minutes and share it with someone special.', path: valid ? `/create/${valid}` : '/create' });
  return <CreateWishWizard key={`${valid}-${tpl}`} initialOcc={valid} initialTpl={tpl} />;
}
