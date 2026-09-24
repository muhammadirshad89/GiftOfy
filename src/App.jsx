import { lazy, Suspense, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import AdminGate from './components/AdminGate.jsx';
import { PAGES } from './data/content.js';

const HomePage = lazy(() => import('./pages/HomePage.jsx'));
const CreateWishPage = lazy(() => import('./pages/CreateWishPage.jsx'));
const WishPage = lazy(() => import('./pages/WishPage.jsx'));
const InfoPage = lazy(() => import('./pages/InfoPage.jsx'));
const AdminLoginPage = lazy(() => import('./pages/AdminLoginPage.jsx'));
const AdminDashboardPage = lazy(() => import('./pages/AdminDashboardPage.jsx'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage.jsx'));

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
      {!bare && <Header />}
      <main id="app">
        <Suspense fallback={<p className="wrap c" role="status">Loading…</p>}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/create" element={<CreateWishPage />} />
            <Route path="/create/:occ" element={<CreateWishPage />} />
            <Route path="/wish/:id" element={<WishPage />} />
            {Object.keys(PAGES).map((k) => <Route key={k} path={`/${k}`} element={<InfoPage k={k} />} />)}
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
