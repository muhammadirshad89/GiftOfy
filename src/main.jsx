import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import './styles/global.css';
import './styles/magic.css';

const root = document.getElementById('root');
const app = <StrictMode><BrowserRouter><App /></BrowserRouter></StrictMode>;
// Public pages are pre-rendered at build time (scripts/prerender.mjs) and flagged with data-prerendered;
// hydrate those so the visitor keeps the HTML they already see. Everything else renders client-side as before.
if (root.dataset.prerendered && root.hasChildNodes()) hydrateRoot(root, app);
else createRoot(root).render(app);
