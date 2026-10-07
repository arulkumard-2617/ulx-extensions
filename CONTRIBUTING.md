# Contributing

## Before changing UI

Read:

1. `docs/PROJECT-BLUEPRINT.md`
2. `docs/UI-DESIGN-RULES.md`
3. `docs/PRIMEREACT-USAGE.md`

## Customize the widget

Edit `src/WelcomeWidget.jsx` and `plugin-manifest.json`. Use the
`sdk-extension-builder` skill for AI-assisted widget work.

Keep the widget content-only. Do not rebuild host navigation inside the iframe.

## Verify

```bash
npm run check
```

Do not commit generated output (`app/widget/`, `dist/`), dependencies, local environment files,
or zip archives.

## Pull request checklist

- PrimeReact is used for interactive controls.
- Tailwind is used for layout and spacing.
- Colors use theme tokens, not product hex values in JSX.
- Light and dark theme contrast has been checked.
- Labels, keyboard interaction, loading, empty, and error states are covered.
- `npm run check` passes.
