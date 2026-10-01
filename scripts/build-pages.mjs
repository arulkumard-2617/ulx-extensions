#!/usr/bin/env node
/**
 * Compile one or all pages into dist/<path>/ for upload.
 *
 *   npm run compile              → all pages
 *   npm run compile -- sample    → only dist/sample/
 */
import { build } from 'vite';
import react from '@vitejs/plugin-react';
import {
  mkdirSync,
  writeFileSync,
  rmSync,
  existsSync,
} from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { pageManifest } from '../src/pages/manifest.mjs';
import { projectConfig } from '../src/config/project.config.js';
import { validateProject } from './validate-project.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');
const entriesRoot = resolve(root, '.page-entries');

const args = process.argv.slice(2).filter((a) => !a.startsWith('-'));
const unknownPaths = args.filter(
  (path) => !pageManifest.some((page) => page.path === path),
);

if (unknownPaths.length > 0) {
  console.error(`Unknown page path(s): ${unknownPaths.join(', ')}`);
  console.error(`Available: ${pageManifest.map((page) => page.path).join(', ')}`);
  process.exit(1);
}

const targets =
  args.length === 0
    ? pageManifest
    : pageManifest.filter((p) => args.includes(p.path));

if (targets.length === 0) {
  console.error('No matching pages. Available:');
  pageManifest.forEach((p) => console.error(`  - ${p.path}`));
  process.exit(1);
}

function writeEntry(page) {
  const dir = resolve(entriesRoot, page.path);
  mkdirSync(dir, { recursive: true });

  const mainJsx = `import { mountPage } from '../../src/mount.jsx';
import Page from '../../src/pages/${page.file}';

mountPage(Page);
`;

  const safeTitle = page.title
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
  const hostScripts = projectConfig.hostSdk?.enabled
    ? `    <script src="${projectConfig.hostSdk.sdkUrl}"></script>
    <script src="${projectConfig.hostSdk.frameClientUrl}"></script>
`
    : '';

  const indexHtml = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${safeTitle}</title>
${hostScripts}  </head>
  <body class="ulx-default-mode">
    <div id="root"></div>
    <script type="module" src="./main.jsx"></script>
  </body>
</html>
`;

  writeFileSync(resolve(dir, 'main.jsx'), mainJsx, 'utf8');
  writeFileSync(resolve(dir, 'index.html'), indexHtml, 'utf8');
  return dir;
}

async function buildPage(page) {
  const entryDir = writeEntry(page);
  const outDir = resolve(root, 'dist', page.path);

  console.log(`\n▶ Compiling ${page.path} → dist/${page.path}/`);

  await build({
    configFile: false,
    root: entryDir,
    base: './',
    publicDir: resolve(root, 'public'),
    plugins: [react()],
    resolve: {
      alias: {
        '@': resolve(root, 'src'),
      },
    },
    css: {
      postcss: resolve(root, 'postcss.config.js'),
    },
    define: {
      'import.meta.env.VITE_STANDALONE': JSON.stringify('true'),
    },
    build: {
      outDir,
      emptyOutDir: true,
      assetsDir: 'assets',
    },
  });

  console.log(`✓ dist/${page.path}/ ready to upload`);
}

async function main() {
  validateProject();

  if (existsSync(entriesRoot)) {
    rmSync(entriesRoot, { recursive: true, force: true });
  }

  for (const page of targets) {
    await buildPage(page);
  }

  rmSync(entriesRoot, { recursive: true, force: true });
  console.log('\nDone. Upload the folder(s) under dist/.');
}

main().catch((err) => {
  rmSync(entriesRoot, { recursive: true, force: true });
  console.error(err);
  process.exit(1);
});
