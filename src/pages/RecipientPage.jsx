import ContentPage from './ContentPage.jsx';
import { META_BY_KEY } from '../data/pageMeta.js';
import { RECIPIENT_BODIES } from '../data/content/recipients.js';

/** Route wrapper: looks up the registry row and the body for one URL key (see src/App.jsx). */
export default function RecipientPage({ k }) {
  return <ContentPage meta={META_BY_KEY[k]} body={RECIPIENT_BODIES[k]} />;
}
