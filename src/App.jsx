import { lazy, Suspense, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import AdminGate from './components/AdminGate.jsx';
import { PAGE_META } from './data/pageMeta.js';

const HomePage = lazy(() => import('./pages/HomePage.jsx'));
const CreateWishPage = lazy(() => import('./pages/CreateWishPage.jsx'));
const WishPage = lazy(() => import('./pages/WishPage.jsx'));
const ReplyPage = lazy(() => import('./pages/ReplyPage.jsx'));
const OccasionPage = lazy(() => import('./pages/OccasionPage.jsx'));
const RecipientPage = lazy(() => import('./pages/RecipientPage.jsx'));
const GuidePage = lazy(() => import('./pages/GuidePage.jsx'));
const CorePage = lazy(() => import('./pages/CorePage.jsx'));
const HubPage = lazy(() => import('./pages/HubPage.jsx'));
const AdminLoginPage = lazy(() => import('./pages/AdminLoginPage.jsx'));
const AdminDashboardPage = lazy(() => import('./pages/AdminDashboardPage.jsx'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage.jsx'));

// One route per registry row (src/data/pageMeta.js), so a page can never be linked/sitemapped without
// being routable, or routable without being in the registry.
const PAGE_BY_GROUP = { occasion: OccasionPage, recipient: RecipientPage, guide: GuidePage, core: CorePage, legal: CorePage };
const REGISTRY_ROUTES = PAGE_META.filter((m) => m.group === 'hub' || PAGE_BY_GROUP[m.group]).map((m) => {
  const Page = m.group === 'hub' ? HubPage : PAGE_BY_GROUP[m.group];
  return <Route key={m.path} path={m.path} element={<Page k={m.key} />} />;
});

export default function App() {
  const { pathname, hash } = useLocation();
  const bare = pathname.startsWith('/wish/'); // recipient page is chrome-free
  useEffect(() => {
    if (hash) {
      const t = setTimeout(() => document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: 'smooth' }), 60);
      return () => clearTimeout(t);
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);
  return (
    <>
      {!bare && <a className="skip" href="#app">Skip to content</a>}
      {!bare && <Header />}
      <main id="app">
        <Suspense fallback={<p className="wrap c" role="status">Loading…</p>}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/create" element={<CreateWishPage />} />
            <Route path="/create/:occ" element={<CreateWishPage />} />
            <Route path="/wish/:id" element={<WishPage />} />
            <Route path="/reply/:token" element={<ReplyPage />} />
            {REGISTRY_ROUTES}
            <Route path="/admin/login" element={<AdminLoginPage />} />
            <Route path="/admin" element={<AdminGate><AdminDashboardPage /></AdminGate>} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </main>
      {!bare && <Footer />}
    </>
  );
}
