/**
 * Consistent page-title hierarchy with an optional action area.
 */
export default function PageHeader({ title, description, actions }) {
  return (
    <header className="mb-8 flex flex-wrap items-start justify-between gap-4">
      <div className="min-w-0">
        <h1 className="m-0 text-h5 font-bold text-text">{title}</h1>
        {description ? (
          <p className="mb-0 mt-1 text-default text-text-secondary">
            {description}
          </p>
        ) : null}
      </div>
      {actions ? <div className="flex shrink-0 items-center gap-2">{actions}</div> : null}
    </header>
  );
}
