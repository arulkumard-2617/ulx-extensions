/**
 * Single source of truth for custom pages.
 * - Home index + router read this via registry.js
 * - Per-page compile (dist/<path>/) reads this via scripts/build-pages.mjs
 *
 * file: component filename under src/pages/
 */
export const pageManifest = [
  {
    path: 'sample',
    title: 'Sample page',
    description: 'Starter layout — replace with your screens',
    file: 'SamplePage.jsx',
  },
];
