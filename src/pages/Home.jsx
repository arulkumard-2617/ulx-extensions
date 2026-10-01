import { Link } from 'react-router-dom';
import { pages } from './registry.js';
import { projectConfig } from '../config/project.config.js';

/**
 * Page index — clean centered card.
 * Each link navigates to its own route (not embedded in home).
 */
export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-body px-4 py-10">
      <main className="w-full max-w-md rounded-xl border border-border bg-surface px-8 py-10 text-center shadow-sm">
        <h1 className="m-0 mb-2 text-h7 font-bold tracking-wide text-text">
          {projectConfig.name}
        </h1>

        <p className="m-0 mb-8 text-default leading-relaxed text-text-secondary">
          {projectConfig.description}
        </p>

        {pages.length === 0 ? (
          <p className="m-0 text-small text-text-muted">
            No pages yet. Add entries in{' '}
            <code className="text-primary">src/pages/manifest.mjs</code>.
          </p>
        ) : (
          <nav className="flex flex-col gap-2.5 text-left" aria-label="Pages">
            {pages.map((page) => (
              <Link
                key={page.path}
                to={`/${page.path}`}
                className="group block rounded-lg border border-border bg-surface px-4 py-3 no-underline transition-colors hover:border-primary hover:bg-primary/5"
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <div className="truncate text-default font-semibold text-text group-hover:text-primary">
                      {page.title}
                    </div>
                    {page.description ? (
                      <div className="mt-0.5 truncate text-tiny text-text-muted">
                        {page.description}
                      </div>
                    ) : null}
                  </div>
                  <i
                    className="pi pi-arrow-right text-tiny text-text-muted group-hover:text-primary"
                    aria-hidden="true"
                  />
                </div>
              </Link>
            ))}
          </nav>
        )}

        <p className="mb-0 mt-8 text-tiny text-text-muted">
          Register pages in <code className="text-text-secondary">manifest.mjs</code>
        </p>
      </main>
    </div>
  );
}
