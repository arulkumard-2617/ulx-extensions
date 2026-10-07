/**
 * Theme helpers — body class contract shared with the host product.
 *
 * Light:  ulx-default-mode
 * Dark:   ulx-default-mode ulx-dark-mode
 * Accent: ulx-cobalt-theme | ulx-cardinal-theme | ulx-fern-theme | ulx-tangerine-theme
 * Font:   lato | lato2 | roboto | manrope | zoho-puvi | puvi | dyslexic
 */

const MODE_CLASSES = ['ulx-default-mode', 'ulx-dark-mode'];
const ACCENT_CLASSES = [
  'ulx-cobalt-theme',
  'ulx-cardinal-theme',
  'ulx-fern-theme',
  'ulx-tangerine-theme',
];
const FONT_CLASSES = [
  'lato',
  'lato2',
  'roboto',
  'manrope',
  'zoho-puvi',
  'puvi',
  'dyslexic',
];
const ALLOWED_THEME_CLASSES = new Set([
  ...MODE_CLASSES,
  ...ACCENT_CLASSES,
  ...FONT_CLASSES,
]);

function accentClass(accent) {
  if (!accent) return null;
  if (accent.startsWith('ulx-') && accent.endsWith('-theme')) return accent;
  return `ulx-${accent}-theme`;
}

export function applyTheme({ dark = false, accent = null, font = null } = {}) {
  const body = document.body;

  MODE_CLASSES.forEach((c) => body.classList.remove(c));
  body.classList.add('ulx-default-mode');
  if (dark) body.classList.add('ulx-dark-mode');

  ACCENT_CLASSES.forEach((c) => body.classList.remove(c));
  const accentCls = accentClass(accent);
  if (accentCls && ACCENT_CLASSES.includes(accentCls)) {
    body.classList.add(accentCls);
  }

  if (font) {
    FONT_CLASSES.forEach((c) => body.classList.remove(c));
    if (FONT_CLASSES.includes(font)) {
      body.classList.add(font);
    }
  }
}

/**
 * Listen for theme updates from the parent host (iframe embed).
 *
 * Parent may post either:
 *   { type: 'bs-theme', dark, accent, font }
 *   { type: 'bs-theme', className: 'ulx-default-mode ulx-dark-mode ulx-cobalt-theme' }
 */
export function listenParentTheme() {
  const onMessage = (event) => {
    const data = event.data;
    if (!data || data.type !== 'bs-theme') return;

    if (typeof data.className === 'string') {
      const body = document.body;
      ALLOWED_THEME_CLASSES.forEach((c) => body.classList.remove(c));
      data.className
        .split(/\s+/)
        .filter((className) => ALLOWED_THEME_CLASSES.has(className))
        .forEach((c) => body.classList.add(c));
      if (!body.classList.contains('ulx-default-mode')) {
        body.classList.add('ulx-default-mode');
      }
      return;
    }

    applyTheme({
      dark: Boolean(data.dark),
      accent: data.accent || null,
      font: data.font || null,
    });
  };

  window.addEventListener('message', onMessage);
  return () => window.removeEventListener('message', onMessage);
}
