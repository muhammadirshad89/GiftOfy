import ContentPage from './ContentPage.jsx';
import { META_BY_KEY } from '../data/pageMeta.js';
import { OCCASION_BODIES } from '../data/content/occasions.js';

/** Route wrapper: looks up the registry row and the body for one URL key (see src/App.jsx). */
export default function OccasionPage({ k }) {
  return <ContentPage meta={META_BY_KEY[k]} body={OCCASION_BODIES[k]} />;
}
