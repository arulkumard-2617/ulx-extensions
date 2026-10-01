import { Link, useLocation } from 'react-router-dom';
import { Button } from 'primereact/button';
import { pages } from '../pages/registry.js';
import { projectConfig } from '../config/project.config.js';

/**
 * Local preview chrome only (npm start).
 * Never included in standalone compile → dist/<page>/ upload bundles stay content-only.
 */
export default function AppPreviewShell({ children }) {
  const { pathname } = useLocation();
  const isHome = pathname === '/' || pathname === '';
  const current = pages.find((p) => `/${p.path}` === pathname);

  if (isHome) {
    return children;
  }

  return (
    <div className="min-h-screen bg-body">
      <header className="sticky top-0 z-50 border-b border-border bg-surface/95 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-5 py-2.5 sm:px-8">
          <div className="flex min-w-0 items-center gap-3">
            <span className="shrink-0 text-[12px] font-semibold uppercase tracking-[0.04em] text-text">
              {projectConfig.name}
            </span>
            <span className="truncate text-[13px] text-text-secondary">
              {current?.title || 'Preview'}
            </span>
          </div>
          <Link to="/" className="shrink-0 no-underline">
            <Button
              label="All pages"
              icon="pi pi-arrow-left"
              className="s-size"
              outlined
            />
          </Link>
        </div>
      </header>
      {children}
    </div>
  );
}
