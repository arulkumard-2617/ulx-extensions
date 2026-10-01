import { HashRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import { pages } from './pages/registry.js';
import AppPreviewShell from './components/AppPreviewShell.jsx';

/**
 * Local preview app (npm start).
 * Preview chrome (All pages) lives in AppPreviewShell — not inside page components.
 * Standalone compile mounts pages alone via mount.jsx (no shell).
 */
export default function App() {
  return (
    <HashRouter>
      <AppPreviewShell>
        <Routes>
          <Route path="/" element={<Home />} />
          {pages.map((page) => {
            const Page = page.element;
            return (
              <Route key={page.path} path={`/${page.path}`} element={<Page />} />
            );
          })}
          <Route path="*" element={<Home />} />
        </Routes>
      </AppPreviewShell>
    </HashRouter>
  );
}
