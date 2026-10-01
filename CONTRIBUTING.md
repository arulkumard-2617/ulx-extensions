# Contributing

## Before changing UI

Read:

1. `docs/PROJECT-BLUEPRINT.md`
2. `docs/UI-DESIGN-RULES.md`
3. `docs/PRIMEREACT-USAGE.md`

## Add a page

```bash
npm run create:page -- page-path "Page title"
npm start
```

Keep the page content-only. Local navigation belongs to `AppPreviewShell`, not
the page component.

## Verify

```bash
npm run check
```

Do not commit generated output (`dist/`, `dist-app/`, `.page-entries/`),
dependencies, local environment files, or zip archives.

## Pull request checklist

- PrimeReact is used for interactive controls.
- Tailwind is used for layout and spacing.
- Colors use theme tokens, not product hex values in JSX.
- The page is registered in `src/pages/manifest.mjs`.
- Light and dark theme contrast has been checked.
- Labels, keyboard interaction, loading, empty, and error states are covered.
- `npm run check` passes.
