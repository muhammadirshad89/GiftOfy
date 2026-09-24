import { useParams } from 'react-router-dom';
import CreateWishWizard from '../components/CreateWishWizard.jsx';
import { OCC } from '../data/content.js';
import useSeo from '../utils/useSeo.js';

export default function CreateWishPage() {
  const { occ } = useParams();
  const valid = OCC.some((o) => o.id === occ) ? occ : undefined;
  useSeo({ title: 'Create a Wish', description: 'Create a personalized digital wish in under two minutes and share it with someone special.' });
  return <CreateWishWizard key={valid} initialOcc={valid} />;
}
