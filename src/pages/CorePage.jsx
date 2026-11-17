import ContentPage from './ContentPage.jsx';
import { META_BY_KEY } from '../data/pageMeta.js';
import { CORE_BODIES } from '../data/corePages.js';

/** Route wrapper: looks up the registry row and the body for one URL key (see src/App.jsx). */
export default function CorePage({ k }) {
  return <ContentPage meta={META_BY_KEY[k]} body={CORE_BODIES[k]} />;
}
