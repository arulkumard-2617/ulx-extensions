# ULX Extension UI Design Rules

Rules for building consistent widget pages with this blueprint.
The patterns are derived from approved product screens such as settings forms,
member lists, drawers, dialogs, schedules, and data tables.

**Audience:** humans and AI agents generating pages from screenshots or prompts.

---

Keep the widget **content-only**. Do not rebuild Backstage navigation inside the iframe. Edit `src/WelcomeWidget.jsx`; `npm run build` then `npm run pack`.

---

## 1. Stack roles

| Layer | Use for |
|-------|---------|
| **PrimeReact** | Interactive controls — Button, InputText, Dropdown, Dialog, Sidebar, DataTable, Checkbox, InputSwitch, Tag, Avatar, ProgressBar, Menu, etc. |
| **Tailwind** | Layout, spacing, typography scale, page structure — `flex`, `grid`, `gap-*`, `p-*`, `max-w-*`, text utilities |
| **Theme tokens** (`src/theme/tokens.css`) | Colors that follow product light/dark/accent via `ulx-*` body classes |
| **Webfonts** (`src/theme/fonts.css`) | Product `@font-face` CDN URLs; switch with body classes (`lato`, `roboto`, `zoho-puvi`, …) |

Do **not** invent a second design system. Prefer PrimeReact + token colors + Tailwind spacing.

---

## 2. Page canvas & surfaces

| Surface | Token / class | Typical use |
|---------|---------------|-------------|
| Page background | `bg-body` (`#f5f6f8`) | Full page / iframe root |
| Sidebar / secondary nav | `bg-surface-2` (`#f8f9fb`) | Left sub-nav |
| Content card | `bg-surface` + `border border-border` + `rounded-lg` | Main white panel |
| Nested inset card | `border border-border` + `rounded-md` + light padding | Thumbnail, webcast box, upload tile |
| Top app bar (if building chrome) | `#1a1a2e` (`--bs-nav-bg`) | Dark header — usually **not** inside iframe pages |

Custom pages rendered in an iframe are usually **content-only** (white/light canvas + forms/tables). Do not rebuild host chrome unless the prompt asks for it.

---

## 3. Spacing (critical)

Use an **8px rhythm** (Tailwind spacing in this kit: `1` = 4px, `2` = 8px).

| Context | Rule |
|---------|------|
| Page padding | `p-6`–`p-8` (24–32px) around main content |
| Section gap | `gap-8` / `mb-8`–`mb-10` between major sections |
| Field stack | Label → control gap `gap-1.5` or `mb-1.5`; fields `gap-4`–`gap-5` |
| Form row (date + time) | `flex` / `grid` with `gap-3`–`gap-4` |
| Card inner padding | `p-6`–`p-8` |
| Drawer / slide pane padding | `p-6` (24px) sides; footer buttons with `justify-between` |
| Table cell | Comfortable vertical padding (`py-3`–`py-4`) — do not pack rows tightly |
| Sidebar item | `px-3 py-2`–`py-2.5`; indented children for nested menus |

**Avoid:** cramped forms, zero gaps between sections, full-bleed inputs without page margin.

---

## 4. Typography

Sans-serif stack via product webfonts (`puviregular` default) and body font classes (`lato`, `roboto`, `zoho-puvi`, …) — see `src/theme/fonts.css`.

| Role | Approx size | Weight | Color | Example |
|------|-------------|--------|-------|---------|
| Page title | 22–24px (`text-h5` / `text-2xl`) | Bold | `text-text` | Portal Info, Event Members (1) |
| Section title | 16–18px (`text-h6`) | Semibold/bold | `text-text` | Basic Details, Location & Time Zone |
| Field label | 13–14px (`text-small` / `text-default`) | Medium | `text-text` or slightly muted | Portal Name |
| Body / table cell | 13–14px | Regular | `text-text` | Member name |
| Secondary / meta | 12–13px (`text-tiny` / `text-small`) | Regular | `text-text-secondary` | Email, timestamps |
| Helper / hint | 12px (`text-tiny`) | Regular | `text-text-muted` | Max size: 1MB · Character count |
| Link action | 13–14px | Medium | `text-primary` | Upload, Change, Manage Access |

**Rules:**
- Labels sit **above** inputs (never to the left in dense admin forms unless screenshot shows otherwise).
- Required fields: red asterisk `*` after the label.
- One clear page title; section titles with optional leading line icon.
- Do not use oversized display fonts or decorative type in admin pages.

---

## 5. Color & status

| Role | Guidance |
|------|----------|
| Primary actions | `var(--bs-primary)` / Button default — indigo/blue |
| Links / active nav text | `text-primary` |
| Active nav row | Light primary wash (`--bs-primary-layer2` / `sidebar-active`) + blue text; optional thick left bar |
| Borders | `border-border` — hairline, never heavy |
| Success | Green — open status, toggle on |
| Warning / running | Amber badge (e.g. RUNNING) |
| Danger | Red — Delete in confirm dialogs |
| Alert banner | Soft yellow strip for unpublished changes |

Respect `ulx-dark-mode` / accent theme classes — use CSS variables, not hardcoded hex in page JSX.

---

## 6. Component look (match product)

### Buttons
- Primary: solid primary, white label, radius ~6px, height ~32–36px (`m-size` / `l-size`).
- Secondary / Cancel / Close: outlined or white + grey border + dark text.
- Destructive: `severity="danger"` (Delete).
- Text / link actions: `text` or `outlined` + primary color for “Change”, “Upload”.
- Split buttons (Add Ticket Class ▾) allowed when screenshot shows them.
- Icon + label common (calendar, plus). Place primary CTA bottom-right in drawers/modals; Close on the left in slide panes.

### Inputs & dropdowns
- Height ~32–40px for content forms (`m-size` or `l-size`).
- Light border, radius ~6px; optional light fill (`input` bg token).
- Placeholder muted grey.
- Focus: primary-tint ring / blue border (already in theme).
- Width: often ~50–60% of content column for single fields; full width in drawers.

### Tags / badges
- Pill for status (Open = green).
- Compact height; optional leading dot.

### Tables
- White card wrapper, subtle border, rounded corners.
- No vertical grid lines; light horizontal dividers only.
- Grey headers, sortable affordance if needed.
- Row actions: ellipsis menu (Edit, Hide, Copy URL…).
- Optional left accent bar on selected/active row.

### Dialogs
- Centered, white, soft shadow, small radius.
- Title bold; body short; footer right-aligned Cancel + primary/danger.
- Dimmed overlay behind.

### Slide panes (Invite / Add Session)
- Right-aligned panel, white, ~36–40% width on desktop.
- Header title; scrollable body; footer Close (left) + Done (right).
- Stacked fields with generous gaps.

### Upload tiles
- Soft primary-tint background; preview box left; Upload link + specs right.

### Toggles
- Pill switch; on = green (as in Portal Info).

### Avatars
- Circle, solid color + white initials when no image.

### Progress
- Thin bar, primary fill on light track (e.g. Profile 8%).

---

## 7. Layout patterns

1. **Settings / form page** — page title → sections with icon + title → fields stacked; optional right jump links.
2. **List / members / tickets** — title + count + primary Add button (right) → search → table card.
3. **Drawer create/edit** — Sidebar/Drawer from PrimeReact; form rules above.
4. **Confirm** — Dialog, short copy, Cancel + Delete/Confirm.

Do not put marketing hero layouts, purple gradient themes, or dense newspaper grids into admin pages.

---

## 8. Generating from a screenshot or prompt

When the user pastes a screenshot or describes a page:

1. Identify pattern (form / table / drawer / dialog).
2. Map controls to **PrimeReact** components (see `PRIMEREACT-USAGE.md`).
3. Apply spacing and typography from this file; prefer clear, airy admin UI over compact defaults.
4. Use theme tokens for color; size classes `s-size` | `m-size` | `l-size` on controls.
5. Build only the **iframe content** unless chrome is requested.
6. Replace `src/WelcomeWidget.jsx` (and update `plugin-manifest.json` if the location or label changes). Then `npm run check` and `npm run pack`.

### Checklist before done
- [ ] Page title hierarchy clear
- [ ] Labels above fields; required `*` where needed
- [ ] Consistent gaps (no cramped blocks)
- [ ] Primary CTA placement matches pattern (header right or drawer footer right)
- [ ] Table/list has breathing room
- [ ] Works with light theme tokens; no broken contrast

---

## 9. What custom pages usually exclude

- Full product top bar + dual sidebars (host app already has them around the iframe)
- Re-implementing ULS/ULX CSS
- Heavy shadows, glassmorphism, or decorative gradients

---

**Related:** [PRIMEREACT-USAGE.md](./PRIMEREACT-USAGE.md) · theme in `src/theme/`
