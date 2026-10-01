# ulx-extention-builder

A reusable blueprint for external developers building standalone extension pages
with **React, PrimeReact, and Tailwind**.

The repository owns the design contract, local page index, page scaffolding,
validation, and per-page compilation. Consumers focus on application pages.

---

## Quick start

```bash
git clone <repo-url>
cd ulx-extention-builder
npm install
npm start
```

Compile a page for upload:

```bash
npm run create:page -- attendee-list "Attendee list"
npm run compile -- attendee-list
# → dist/attendee-list/

# optional: zip that folder for upload
npm run pack:zip -- attendee-list
```

Upload **`dist/<page>/`** (or the zip) into the host tag / iframe.

Compile every page: `npm run compile`  
SPA only (optional): `npm run build:app`

---

## Theme classes

Set on `<body>` (host can inject these into the iframe):

| Mode | Classes |
|------|---------|
| Light | `ulx-default-mode` |
| Dark | `ulx-default-mode ulx-dark-mode` |
| Dark + Cobalt | `ulx-default-mode ulx-dark-mode ulx-cobalt-theme` |
| Light + Cobalt | `ulx-default-mode ulx-cobalt-theme` |

Accent themes: `ulx-cobalt-theme`, `ulx-cardinal-theme`, `ulx-fern-theme`, `ulx-tangerine-theme`

Font classes: `lato`, `roboto`, `manrope`, `zoho-puvi`

Parent app can also `postMessage` into the iframe:

```js
iframe.contentWindow.postMessage(
  { type: 'bs-theme', className: 'ulx-default-mode ulx-dark-mode ulx-cobalt-theme' },
  '*'
);
```

---

## Project layout

```
src/
  config/project.config.js         ← project identity + default theme
  components/layout/               ← standard content-only page structure
  pages/Home.jsx                   ← local page index
  pages/manifest.mjs  ← register pages here
  theme/
    tokens.css
    components.css
    theme.js
  styles/index.css
  components/AppPreviewShell.jsx  ← local preview chrome only
  App.jsx
  main.jsx
docs/
  PROJECT-BLUEPRINT.md
  UI-DESIGN-RULES.md
  PRIMEREACT-USAGE.md
public/                ← consumer static assets
dist/                 ← per-page compile output
```

---

## Adding a page

Use the generator:

```bash
npm run create:page -- my-page "My page"
```

Or create `src/pages/MyPage.jsx` manually and register it in
`src/pages/manifest.mjs`:

```js
{
  path: 'my-page',
  title: 'My page',
  description: 'Short blurb',
  file: 'MyPage.jsx',
}
```

3. Preview: `npm start` → link on Home → `/#/my-page`
4. Compile for upload: `npm run compile -- my-page` → `dist/my-page/`
5. Validate before committing: `npm run check`

---

## Docs

| Doc | Purpose |
|-----|---------|
| [docs/PROJECT-BLUEPRINT.md](docs/PROJECT-BLUEPRINT.md) | Architecture, boundaries, lifecycle, and quality gate |
| [docs/UI-DESIGN-RULES.md](docs/UI-DESIGN-RULES.md) | Spacing, type, colors, form/table/drawer patterns |
| [docs/PRIMEREACT-USAGE.md](docs/PRIMEREACT-USAGE.md) | PrimeReact imports, size classes, screenshot → page workflow |

```jsx
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';

<label className="text-small font-medium">Name</label>
<InputText className="l-size w-full max-w-md" />
<Button label="Save" className="m-size" />
```

**Size classes:** `xs-size` · `s-size` · `m-size` · `l-size` · `xl-size`  
**Layout:** Tailwind · **Colors:** `bg-body`, `bg-surface`, `text-primary`, `border-border`

---

## Scripts

| Command | What it does |
|---------|----------------|
| `npm start` | Dev server (home index + all routes) |
| `npm run create:page -- <path> "Title"` | Scaffold and register a content page |
| `npm run validate` | Validate manifest and page registration |
| `npm run check` | Validate and compile every registered page |
| `npm run compile -- sample` | Build one page → `dist/sample/` |
| `npm run compile` | Build every page under `dist/<path>/` |
| `npm run pack:zip -- sample` | Optional zip of `dist/sample/` for upload |
| `npm run build:app` | Optional SPA build (router app) |

---

## Requirements

- Node.js 18+
- npm 9+
