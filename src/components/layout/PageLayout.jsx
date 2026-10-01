/**
 * Standard content-only page canvas for standalone iframe pages.
 *
 * Keep host navigation and preview controls outside this component.
 */
export default function PageLayout({
  children,
  className = '',
  contentClassName = '',
  maxWidth = 'max-w-5xl',
}) {
  return (
    <div className={`min-h-screen bg-body text-text ${className}`}>
      <main
        className={`mx-auto w-full ${maxWidth} px-6 py-8 sm:px-8 ${contentClassName}`}
      >
        {children}
      </main>
    </div>
  );
}
