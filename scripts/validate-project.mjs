#!/usr/bin/env node
import { existsSync, readdirSync, readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath, pathToFileURL } from 'url';
import { pageManifest } from '../src/pages/manifest.mjs';
import { projectConfig } from '../src/config/project.config.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');
const pagesDir = resolve(root, 'src/pages');
const reservedFiles = new Set(['Home.jsx']);

export function validateProject() {
  const errors = [];
  const paths = new Set();
  const files = new Set();

  if (!projectConfig.name?.trim()) {
    errors.push('projectConfig.name is required.');
  }

  if (projectConfig.hostSdk?.enabled) {
    for (const key of ['sdkUrl', 'frameClientUrl']) {
      try {
        const url = new URL(projectConfig.hostSdk[key]);
        if (url.protocol !== 'https:') {
          errors.push(`projectConfig.hostSdk.${key} must use HTTPS.`);
        }
      } catch {
        errors.push(`projectConfig.hostSdk.${key} must be a valid URL.`);
      }
    }
  }

  for (const [index, page] of pageManifest.entries()) {
    const label = `manifest entry ${index + 1}`;

    if (!page || typeof page !== 'object') {
      errors.push(`${label} must be an object.`);
      continue;
    }

    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(page.path || '')) {
      errors.push(`${label}: path must be lowercase kebab-case.`);
    } else if (paths.has(page.path)) {
      errors.push(`${label}: duplicate path "${page.path}".`);
    }
    paths.add(page.path);

    if (typeof page.title !== 'string' || !page.title.trim()) {
      errors.push(`${label}: title is required.`);
    }

    if (typeof page.description !== 'string') {
      errors.push(`${label}: description must be a string.`);
    }

    if (!/^[A-Za-z][A-Za-z0-9]*\.jsx$/.test(page.file || '')) {
      errors.push(`${label}: file must be a JSX filename without directories.`);
      continue;
    }

    if (reservedFiles.has(page.file)) {
      errors.push(`${label}: ${page.file} is reserved for the builder.`);
    } else if (files.has(page.file)) {
      errors.push(`${label}: duplicate file "${page.file}".`);
    }
    files.add(page.file);

    const filePath = resolve(pagesDir, page.file);
    if (!existsSync(filePath)) {
      errors.push(`${label}: src/pages/${page.file} does not exist.`);
    } else {
      const source = readFileSync(filePath, 'utf8');
      if (!/export\s+default\s+/.test(source)) {
        errors.push(`${label}: src/pages/${page.file} needs a default export.`);
      }
    }
  }

  const pageFiles = readdirSync(pagesDir)
    .filter((file) => file.endsWith('.jsx') && !reservedFiles.has(file))
    .sort();
  for (const file of pageFiles) {
    if (!files.has(file)) {
      errors.push(`src/pages/${file} is not registered in manifest.mjs.`);
    }
  }

  if (errors.length > 0) {
    throw new Error(`Project validation failed:\n- ${errors.join('\n- ')}`);
  }

  return {
    pageCount: pageManifest.length,
    paths: [...paths],
  };
}

const isDirectRun =
  process.argv[1] &&
  pathToFileURL(resolve(process.argv[1])).href === import.meta.url;

if (isDirectRun) {
  try {
    const result = validateProject();
    console.log(
      `✓ Project is valid (${result.pageCount} registered page${
        result.pageCount === 1 ? '' : 's'
      })`,
    );
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
}
