#!/usr/bin/env node
/**
 * Scaffold a page and register it in src/pages/manifest.mjs.
 *
 *   npm run create:page -- attendee-list
 *   npm run create:page -- attendee-list "Attendee list"
 */
import { existsSync, readFileSync, writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { pageManifest } from '../src/pages/manifest.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');
const pagesDir = resolve(root, 'src/pages');
const manifestPath = resolve(pagesDir, 'manifest.mjs');
const [rawPath, rawTitle] = process.argv.slice(2);

if (!rawPath) {
  console.error('Usage: npm run create:page -- <page-path> ["Page title"]');
  process.exit(1);
}

const pagePath = rawPath.trim().toLowerCase();
if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(pagePath)) {
  console.error('Page path must be lowercase kebab-case (example: attendee-list).');
  process.exit(1);
}

if (pageManifest.some((page) => page.path === pagePath)) {
  console.error(`Page "${pagePath}" is already registered.`);
  process.exit(1);
}

const pascalName = pagePath
  .split('-')
  .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
  .join('');
const componentName = `${pascalName}Page`;
const fileName = `${componentName}.jsx`;
const pageTitle =
  rawTitle?.trim() ||
  pagePath
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
const titleLiteral = JSON.stringify(pageTitle);
const pageFile = resolve(pagesDir, fileName);

if (existsSync(pageFile)) {
  console.error(`File already exists: src/pages/${fileName}`);
  process.exit(1);
}

const pageSource = `import PageLayout from '../components/layout/PageLayout.jsx';
import PageHeader from '../components/layout/PageHeader.jsx';

export default function ${componentName}() {
  return (
    <PageLayout>
      <PageHeader
        title={${titleLiteral}}
        description="Replace this text with a concise page description."
      />

      <section className="rounded-lg border border-border bg-surface p-6">
        <p className="m-0 text-default text-text-secondary">
          Start building this page with PrimeReact controls and Tailwind layout utilities.
        </p>
      </section>
    </PageLayout>
  );
}
`;

const manifest = readFileSync(manifestPath, 'utf8');
const closingIndex = manifest.lastIndexOf('];');
if (closingIndex === -1) {
  console.error('Could not update src/pages/manifest.mjs: closing array not found.');
  process.exit(1);
}

const entry = `  {
    path: '${pagePath}',
    title: ${titleLiteral},
    description: 'Add a short description',
    file: '${fileName}',
  },
`;
const nextManifest =
  manifest.slice(0, closingIndex) + entry + manifest.slice(closingIndex);

writeFileSync(pageFile, pageSource, 'utf8');
writeFileSync(manifestPath, nextManifest, 'utf8');

console.log(`Created src/pages/${fileName}`);
console.log(`Registered route /#/${pagePath}`);
console.log(`Compile with: npm run compile -- ${pagePath}`);
