# Using PrimeReact in the ULX Extension Blueprint

How to build custom pages with **PrimeReact** + **Tailwind** in this kit.
Read [UI-DESIGN-RULES.md](./UI-DESIGN-RULES.md) for spacing, typography, and layout.

---

## Setup (already done in the kit)

```jsx
// src/main.jsx
import { PrimeReactProvider } from 'primereact/api';
import 'primeicons/primeicons.css';
import 'primereact/resources/primereact.min.css';
import './theme/tokens.css';
import './theme/components.css';

<PrimeReactProvider>
  <WelcomeWidget />
</PrimeReactProvider>
```

Theme look for Button, Input, Tag, Dropdown, Card is in `src/theme/components.css`.
Colors follow `ulx-*` body classes via `src/theme/tokens.css`.

---

## Import pattern

Import from the component path (tree-shaking friendly):

```jsx
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Dropdown } from 'primereact/dropdown';
import { Checkbox } from 'primereact/checkbox';
import { InputSwitch } from 'primereact/inputswitch';
import { Dialog } from 'primereact/dialog';
import { Sidebar } from 'primereact/sidebar';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Tag } from 'primereact/tag';
import { Avatar } from 'primereact/avatar';
import { ProgressBar } from 'primereact/progressbar';
import { Menu } from 'primereact/menu';
import { Toast } from 'primereact/toast';
import { Card } from 'primereact/card';
```

Icons: PrimeIcons classes, e.g. `icon="pi pi-plus"`, `icon="pi pi-search"`.

---

## Size classes (kit convention)

Add these on PrimeReact roots to match the blueprint control heights:

| Class | Height (approx) | Use |
|-------|-----------------|-----|
| `xs-size` | 24px | Compact chips / dense toolbars |
| `s-size` | 28px | Compact actions |
| `m-size` | 32px | **Default for most form actions** |
| `l-size` | 36–40px | Primary form fields / main CTAs |
| `xl-size` | 40px | Emphasized controls |

```jsx
<Button label="Save" className="m-size" />
<InputText className="l-size w-full max-w-md" placeholder="Portal name" />
<Tag value="Open" severity="success" className="s-size" />
```

---

## Map UI → PrimeReact

| UI pattern | PrimeReact | Notes |
|--------------|------------|-------|
| Primary / secondary button | `Button` | `outlined`, `text`, `severity` |
| Text field | `InputText` | Label above via Tailwind |
| Long text | `InputTextarea` | Show char count as helper text |
| Select | `Dropdown` | |
| Checkbox | `Checkbox` | Label beside control |
| Toggle | `InputSwitch` | On color follows theme / green in product |
| Status pill | `Tag` | `severity="success"` etc. |
| User face | `Avatar` | `label="JD"` or `image` |
| Progress | `ProgressBar` | Thin profile completion |
| Table | `DataTable` + `Column` | Wrap in bordered white card |
| Row ⋮ menu | `Menu` + `Button` icon | |
| Confirm delete | `Dialog` | Footer Cancel + Delete |
| Invite / Add Session panel | `Sidebar` `position="right"` | |
| Search | `InputText` + `pi-search` | Or `IconField` / `InputIcon` if used |
| Toast / banner | `Toast` or custom alert `div` | Yellow unpublished banner = custom |

---

## Form field pattern

```jsx
<div className="flex flex-col gap-1.5 max-w-md">
  <label className="text-small font-medium text-text">
    Portal Name <span className="text-danger">*</span>
  </label>
  <InputText className="l-size w-full" value={name} onChange={(e) => setName(e.target.value)} />
  <span className="text-tiny text-text-muted">Visible on your portal home.</span>
</div>
```

Drawer footer:

```jsx
<div className="flex items-center justify-between border-t border-border pt-4">
  <Button label="Close" className="m-size" outlined onClick={onHide} />
  <Button label="Done" className="m-size" onClick={onSave} />
</div>
```

Dialog footer:

```jsx
<div className="flex justify-end gap-2">
  <Button label="Cancel" className="m-size" outlined onClick={onHide} />
  <Button label="Delete" className="m-size" severity="danger" onClick={onConfirm} />
</div>
```

---

## Layout with Tailwind

```jsx
import PageLayout from '../components/layout/PageLayout.jsx';
import PageHeader from '../components/layout/PageHeader.jsx';

<PageLayout>
  <PageHeader title="Event Info" description="Manage event details." />
  <section className="rounded-lg border border-border bg-surface p-6">
    {/* page content */}
  </section>
</PageLayout>
```

List header:

```jsx
<div className="mb-4 flex items-center justify-between gap-4">
  <h1 className="m-0 text-h5 font-bold text-text">Event Members (1)</h1>
  <Button label="Invite Event Members" icon="pi pi-plus" className="m-size" />
</div>
```

---

## Generating a widget from a screenshot or prompt

1. Open `docs/UI-DESIGN-RULES.md` and follow spacing/type.
2. Pick PrimeReact components from the table above — **do not** rebuild buttons/inputs as raw HTML.
3. Replace `src/WelcomeWidget.jsx` (and update `plugin-manifest.json` if the location or label changes).
4. Preview with `npm start`.
5. Validate and compile with `npm run check`, then pack with `npm run pack`.

### Prompt template (for AI / teammates)

```text
Build a product-style Backstage widget in this blueprint.
- Use the sdk-extension-builder skill
- Use PrimeReact for all controls
- Use Tailwind for layout/spacing per docs/UI-DESIGN-RULES.md
- Content only (no app chrome) unless asked
- Use PageLayout/PageHeader and keep plugin-manifest.json in sync
[Attach screenshot or describe sections/fields]
```

---

## Theme sync (iframe)

The parent host may set body classes or postMessage:

```js
{ type: 'bs-theme', className: 'ulx-default-mode ulx-dark-mode ulx-cobalt-theme' }
```

Do not hardcode theme colors in JSX; use `text-primary`, `bg-body`, `border-border`, or CSS variables.

---

## Docs & further reading

- PrimeReact: https://primereact.org/
- Design rules: [UI-DESIGN-RULES.md](./UI-DESIGN-RULES.md)
- Kit README: [../README.md](../README.md)
