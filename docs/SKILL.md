---
name: sdk-extension-builder
description: Builds complete Eventz Backstage SDK extensions with plugin-manifest.json, compiled Tailwind/PrimeReact pages, Backstage frame-client logic, connector declarations, and packaged app assets.
---

# SDK Extension Builder

Build a deployable extension, not an isolated HTML mockup.

Before editing, read:

- [MANIFEST.md](MANIFEST.md) for manifest contracts and mode examples.
- [CLIENT.md](CLIENT.md) for the iframe client API.
- [rules/sdk-extension-html.mdc](rules/sdk-extension-html.mdc)
- [rules/sdk-extension-client.mdc](rules/sdk-extension-client.mdc)
- [rules/sdk-extension-manifest.mdc](rules/sdk-extension-manifest.mdc)

This skill consumes existing widget locations. Adding a new host location requires coordinated changes in the Backstage host and is outside this extension-package workflow.

## 1. Establish the extension contract

Determine:

1. User workflow and widget entry point.
2. Existing widget location.
3. Presentation mode: embedded, `sidePane`, `modal`, `popup`, `newTab`, `route`, or background.
4. Local HTML entry file under `app/`.
5. Backstage v3 API operations required.
6. External domains and connector link names required.
7. Host metadata expected at the chosen location.

Ask only for values that cannot be inferred, especially connector IDs, data-center mappings, and external scopes.

## 2. Use the extension package structure

```text
extension-root/
├── plugin-manifest.json
└── app/
    └── widget/
        ├── index.html
        ├── assets/
        └── images/
```

- Put every runtime file referenced by the manifest under `app/`.
- Use one clearly named compiled folder per widget when the extension has multiple surfaces.
- Use relative paths for local images and assets.
- Keep `plugin-manifest.json` at the package root.
- Add only files required at runtime; do not package source notes or secrets.

## 3. Create the manifest

Start from the base manifest in [MANIFEST.md](MANIFEST.md), then add one widget entry per surface.

- Use only a supported widget location.
- Give every widget a stable, unique ID.
- Match the manifest mode to what the host location can render.
- Declare every external domain in `whiteListedDomains`.
- Keep connector link names aligned across `dcConnectors` and `app.request`.
- Ensure every `/app/...` URL resolves to a packaged file.
- Do not add `functions` or `triggers` unless the requested workflow uses them.

## 4. Create and compile each widget page

Create pages through this blueprint:

```bash
npm run create:page -- attendee-widget "Attendee widget"
npm start
npm run compile -- attendee-widget
```

Use PrimeReact for interactive controls, Tailwind for layout, and token-backed
theme classes. The compiler emits the required host SDK scripts before the
application bundle and creates a self-contained `dist/attendee-widget/`.

Copy that compiled folder into the extension package under `app/`. Do not link
the legacy ULX stylesheet or hand-copy framework source files into the package.

## 5. Implement client behavior

Initialize before using host data:

```javascript
const app = await ZBackstage.extension.init();
```

- Use `app.api` for Backstage APIs.
- Use `app.request` for connector-backed external APIs.
- Use `app.storage` for extension state.
- Use `app.ui` for host notifications, dialogs, panes, and modal lifecycle.
- Use `app.widget.render` to open another declared side-pane or modal widget.
- Use `app.action` and `app.event` only for explicit bidirectional contracts.
- Render an actionable initialization error instead of leaving a blank iframe.
- Keep user input and remote values out of `innerHTML`.

## 6. Verify as one package

Before handoff:

- Parse `plugin-manifest.json` as JSON.
- Check widget IDs and full locations are unique.
- Check each mode satisfies [MANIFEST.md](MANIFEST.md).
- Check every manifest URL exists under `app/`.
- Check every HTML file loads ZSDK before the Backstage frame client.
- Check every external hostname is allowlisted and connector use is declared.
- Check controls have labels, keyboard behavior, pending states, and useful errors.
- Check no credentials or environment-specific secrets are packaged.
- Exercise initialization and the primary success/failure path in a Backstage iframe when available.

Report the widget location, mode, entry file, connector/domain requirements, and verification performed.
