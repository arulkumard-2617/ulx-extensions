/**
 * Register every custom page for the local preview app (router + home links).
 * Paths / titles come from manifest.mjs — add the component file there too.
 */
import { pageManifest } from './manifest.mjs';

const modules = import.meta.glob('./*.jsx', { eager: true });

export const pages = pageManifest.map((page) => {
  const mod = modules[`./${page.file}`];
  if (!mod?.default) {
    throw new Error(`Page component not found: src/pages/${page.file}`);
  }
  return {
    path: page.path,
    title: page.title,
    description: page.description,
    element: mod.default,
  };
});
