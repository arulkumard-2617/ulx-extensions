import { createWriteStream, existsSync, readdirSync, statSync } from 'fs';
import { resolve, dirname, basename } from 'path';
import { fileURLToPath } from 'url';
import archiver from 'archiver';

/**
 * Zip a compiled page folder for upload.
 *
 *   npm run pack:zip -- sample   → bs-page-sample.zip
 *   npm run pack:zip             → zips every folder under dist/
 */
const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');
const distRoot = resolve(root, 'dist');
const args = process.argv.slice(2).filter((a) => !a.startsWith('-'));

if (!existsSync(distRoot)) {
  console.error('dist/ not found. Run: npm run compile -- <page>');
  process.exit(1);
}

function zipFolder(folderPath, outName) {
  return new Promise((resolvePromise, reject) => {
    const outFile = resolve(root, outName);
    const output = createWriteStream(outFile);
    const archive = archiver('zip', { zlib: { level: 9 } });

    output.on('close', () => {
      console.log(`Created ${outFile} (${archive.pointer()} bytes)`);
      resolvePromise();
    });
    archive.on('error', reject);
    archive.pipe(output);
    archive.directory(folderPath, false);
    archive.finalize();
  });
}

const folders =
  args.length > 0
    ? args.map((name) => resolve(distRoot, name))
    : readdirSync(distRoot)
        .map((name) => resolve(distRoot, name))
        .filter((p) => statSync(p).isDirectory());

if (folders.length === 0) {
  console.error('No page folders in dist/. Compile a page first.');
  process.exit(1);
}

for (const folder of folders) {
  if (!existsSync(folder) || !statSync(folder).isDirectory()) {
    console.error(`Missing: ${folder}`);
    process.exit(1);
  }
  const name = basename(folder);
  await zipFolder(folder, `bs-page-${name}.zip`);
}

console.log('Upload the zip (or dist/<page>/ contents) to the host app.');
