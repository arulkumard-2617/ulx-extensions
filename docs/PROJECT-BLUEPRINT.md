# Project Blueprint

`ulx-extention-builder` is a clone-and-build foundation for external developers.
It provides the structure, theme contract, UI rules, preview experience, and
per-page compiler required to create consistent standalone iframe pages.

## Design goals

1. **Consistent output** — all pages use the same tokens, typography, spacing,
   and PrimeReact styling.
2. **Independent delivery** — every registered page compiles into its own
   `dist/<path>/` folder.
3. **Content-only pages** — host navigation and local preview controls never
   enter uploaded bundles.
4. **Safe extension points** — consumers edit configuration, pages, and public
   assets without changing build internals.
5. **Easy validation** — invalid manifest entries and unregistered pages fail
   before compilation.

## Ownership boundaries

### Consumers should edit

- `src/config/project.config.js` — project identity, default theme, and host SDK URLs
- `src/pages/*.jsx` — application pages
- `src/pages/manifest.mjs` — page metadata and output path
- `public/` — static images and font files
- `src/theme/tokens.css` — only when adding approved product tokens

### Blueprint infrastructure

- `src/mount.jsx` — standalone page mounting
- `src/pages/registry.js` — local preview registry
- `src/components/AppPreviewShell.jsx` — local-only navigation
- `scripts/build-pages.mjs` — per-page compiler
- `scripts/validate-project.mjs` — project checks
- `scripts/create-page.mjs` — page scaffolder

Avoid changing infrastructure for individual page requirements.

## Page lifecycle

```text
create page
    ↓
register in manifest
    ↓
preview through local page index
    ↓
validate
    ↓
compile standalone output
    ↓
upload dist/<path>/
```

### Create

```bash
npm run create:page -- attendee-list "Attendee list"
```

This creates `src/pages/AttendeeListPage.jsx` and adds its metadata to the
manifest.

### Preview

```bash
npm start
```

The home page lists all registered screens. Preview navigation belongs to
`AppPreviewShell`; page components remain content-only.

### Validate

```bash
npm run validate
```

Validation checks:

- paths are unique lowercase kebab-case
- component filenames are safe and unique
- registered files exist and have a default export
- page files are registered
- builder-owned files are not registered as upload pages

### Compile

```bash
npm run compile -- attendee-list
```

Output:

```text
dist/attendee-list/
├── index.html
├── assets/
└── images/       # only when public images exist
```

All asset paths are relative, so the folder can be hosted below any URL.
When `projectConfig.hostSdk.enabled` is true, each generated `index.html` loads
the SDK first and the frame client second before the application module.

## UI architecture

### PrimeReact

Use PrimeReact for interactive behavior and accessibility: buttons, fields,
dropdowns, dialogs, drawers, tables, tags, menus, and feedback.

### Tailwind

Use Tailwind for page layout, spacing, responsive behavior, and typography.
Prefer token-backed utilities such as `bg-body`, `bg-surface`, `text-text`,
`text-primary`, and `border-border`.

### Shared layout primitives

- `PageLayout` provides the full iframe canvas and standard page gutters.
- `PageHeader` provides title, description, and action placement.

These components standardize structure without wrapping or replacing
PrimeReact controls.

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

This validates the project and compiles every registered page. A pull request
should not include `node_modules/`, `dist/`, `dist-app/`, generated page entry
files, or zip archives.

## Further guidance

- [UI-DESIGN-RULES.md](./UI-DESIGN-RULES.md)
- [PRIMEREACT-USAGE.md](./PRIMEREACT-USAGE.md)
- [CLIENT.md](./CLIENT.md) for host-frame SDK integration
