import ContentPage from './ContentPage.jsx';
import { META_BY_KEY } from '../data/pageMeta.js';
import { GUIDE_BODIES } from '../data/content/guides.js';

/** Route wrapper: looks up the registry row and the body for one URL key (see src/App.jsx). */
export default function GuidePage({ k }) {
  return <ContentPage meta={META_BY_KEY[k]} body={GUIDE_BODIES[k]} />;
}
