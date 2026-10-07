# Project Blueprint

`ulx-extension-builder` is a clone-and-build starter for Backstage extensions.
It provides one space-settings welcome widget, the theme contract, UI rules,
and a compiler that writes `app/widget/` for [Zoho Extension Toolkit](https://help.zoho.com/portal/en/kb/sigma/general/articles/create-extensions-using-online-zoho-extension-toolkit) packing.

## Design goals

1. **Consistent output** — the widget uses the same tokens, typography, spacing,
   and PrimeReact styling as Backstage.
2. **Complete package** — `npm run build` writes `app/widget/`; `npm run pack`
   runs `zet pack` to produce `dist/*.zip`.
3. **Content-only widget** — host navigation is not rebuilt inside the iframe.
4. **AI-ready** — Cursor discovers the sdk-extension-builder skill and rules
   under `.cursor/`.
5. **Easy validation** — invalid manifests, missing SDK scripts, and missing
   packaged files fail before handoff.

## Ownership boundaries

### Consumers should edit

- `plugin-manifest.json` — widget location, `title`, root `url`, connectors, and domains
- `src/WelcomeWidget.jsx` — the embedded page
- `src/config/project.config.js` — project identity and host SDK URLs
- `public/` — static images and font files
- `src/theme/tokens.css` — only when adding approved product tokens
- `src/theme/fonts.css` — product webfont `@font-face` (Zoho CDN; keep in sync with uls_v2)

### Blueprint infrastructure

- `src/main.jsx` — widget mounting, fonts/tokens import, and theme listener
- `scripts/build-extension.mjs` — package compiler
- `scripts/validate-extension.mjs` — manifest and package checks
- `.cursor/skills/sdk-extension-builder/` — AI skill for building widgets

Avoid changing infrastructure for individual widget requirements.

## Widget lifecycle

```text
clone starter
    ↓
preview WelcomeWidget locally
    ↓
customize with the sdk-extension-builder skill
    ↓
validate
    ↓
build app/widget/
    ↓
zet pack → dist/*.zip
    ↓
upload to Backstage
```

### Preview

```bash
npm start
```

Local preview shows a fallback when the Backstage SDK is not present.

### Validate

```bash
npm run validate
```

Validation checks:

- plugin manifest JSON and BACKSTAGE service
- unique widget IDs and locations
- a root `url` on every widget, plus route-mode requirements for space settings
- HTTPS SDK URLs
- ZSDK loaded before the frame client
- `app.request` hostnames in `whiteListedDomains` and connection names in `dcConnectors`
- packaged files exist under `app/` after `npm run build`

### Build

```bash
npm run build
```

Output:

```text
plugin-manifest.json
app/widget/
├── index.html
└── assets/
```

Then pack with the Zoho Extension Toolkit:

```bash
npm run pack
```

That runs `zet pack` and writes `dist/<project>.zip`.

All asset paths are relative. Generated HTML loads the SDK first and the frame
client second before the application module.

## UI architecture

### PrimeReact

Use PrimeReact for interactive behavior and accessibility: buttons, fields,
dropdowns, dialogs, drawers, tables, tags, menus, and feedback.

### Tailwind

Use Tailwind for layout, spacing, responsive behavior, and typography.
Prefer token-backed utilities such as `bg-body`, `bg-surface`, `text-text`,
`text-primary`, and `border-border`.

### Shared layout primitives

- `PageLayout` provides the full iframe canvas and standard page gutters.
- `PageHeader` provides title, description, and action placement.

### Theme contract

Themes are selected by body classes:

```html
<body class="ulx-default-mode">
<body class="ulx-default-mode ulx-dark-mode">
<body class="ulx-default-mode ulx-dark-mode ulx-cobalt-theme">
```

Pages consume theme variables indirectly through Tailwind token classes and
the PrimeReact overrides in `src/theme/components.css`.

## Quality gate

Run before committing:

```bash
npm run check
```

A pull request should not include `node_modules/`, compiled `app/widget/`,
`dist/`, generated zip archives, or secrets.

## Further guidance

- [UI-DESIGN-RULES.md](./UI-DESIGN-RULES.md)
- [PRIMEREACT-USAGE.md](./PRIMEREACT-USAGE.md)
- [CLIENT.md](./CLIENT.md) for host-frame SDK integration
- [API.md](./API.md) for Backstage v3 query names and response bodies
- [MANIFEST.md](./MANIFEST.md) for plugin-manifest contracts
