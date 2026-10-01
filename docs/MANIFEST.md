# Plugin manifest reference

## Base manifest

```json
{
  "whiteListedDomains": [],
  "service": "BACKSTAGE",
  "cspDomains": [],
  "dcConnectors": {},
  "storage": false,
  "locale": ["en"],
  "modules": {
    "widgets": []
  }
}
```

`service`, `locale`, `whiteListedDomains`, and `modules.widgets` are required. `storage` and `dcConnectors` are optional. Extra packaging fields such as `cspDomains` do not replace `whiteListedDomains`.

`modules.functions` and `modules.triggers` are optional. Omit them when unused.

## Shared widget rules

- `location`: required and must resolve to a supported static location.
- `id`: required, non-empty, and unique across all widgets.
- A full location may appear only once.
- A suffix such as `backstage.exhibitor.menu#crm-search` creates a distinct full location; validation removes the suffix when checking support and background count.
- Only one `backstage.background.process` widget is allowed, including suffixed variants.
- `icon` and `title` may be consumed by menu/navigation hosts.

## Side pane or modal

```json
{
  "icon": "bs-icons1 add-icon-01",
  "location": "backstage.exhibitor.menu",
  "id": "exhibitor-crm-search",
  "title": "Add exhibitor from CRM",
  "viewMode": "sidePane",
  "url": "/app/widget.html"
}
```

`sidePane`, `modal`, embedded widgets, background widgets, and widgets with no `viewMode` require a non-empty root `url`.

## Popup

```json
{
  "location": "backstage.site.pre.registration",
  "id": "pre-registration-popup",
  "viewMode": "popup",
  "url": "/app/pre-registration.html",
  "popupConfig": {
    "position": "bottom",
    "action": "click"
  }
}
```

A popup requires root `url`, `popupConfig.position`, and `popupConfig.action`.

## New tab

Static target:

```json
{
  "location": "backstage.event.attendee.menu",
  "id": "attendee-help",
  "viewMode": "newTab",
  "navigationConfig": {
    "urlType": "static",
    "url": "https://example.com/help"
  }
}
```

Dynamic target:

```json
{
  "location": "backstage.event.attendee.menu",
  "id": "attendee-dynamic-link",
  "viewMode": "newTab",
  "navigationConfig": {
    "urlType": "dynamic",
    "method": "resolveAttendeeUrl"
  }
}
```

`newTab` does not require a root widget `url`. Its `urlType` must be exactly `static` or `dynamic`.

## Route

```json
{
  "location": "backstage.event.settings.left.pane",
  "id": "event-settings-extension",
  "title": "Extension settings",
  "viewMode": "route",
  "navigationConfig": {
    "customPath": "extension-settings",
    "url": "/app/settings.html"
  }
}
```

Route validation requires both non-empty `navigationConfig.customPath` and `navigationConfig.url`. A root widget `url` does not satisfy the route URL check.

These locations are route-only:

- `backstage.portal.settings.left.pane`
- `backstage.space.settings.left.pane`
- `backstage.event.settings.left.pane`
- `backstage.event.abstract.editor`

## Dynamic and static labels

```json
{
  "labelConfig": {
    "type": "static",
    "label": "Extension settings"
  }
}
```

```json
{
  "labelConfig": {
    "type": "dynamic",
    "method": "resolveLabel"
  }
}
```

If supplied, use `type: "static"` with a non-empty `label`, or `type: "dynamic"` with a non-empty `method`.

## Connector declaration

The package format maps data centers and connector IDs to service/link names:

```json
{
  "whiteListedDomains": ["zohoapis.com"],
  "dcConnectors": {
    "US": {
      "CONNECTOR_ID": ["backstage", "readzcrm"]
    }
  }
}
```

Do not invent connector IDs or data-center mappings. Obtain them from the extension configuration. The link name used by client code must match:

```javascript
await app.request({
  apiType: "api",
  url: "https://zohoapis.com/crm/v8/Contacts",
  connection: "readzcrm"
});
```

## Supported locations

- `backstage.portal.settings.integrations.crm`
- `backstage.site.pre.registration`
- `backstage.event.attendee.menu`
- `backstage.custom.form.response.menu`
- `backstage.background.process`
- `backstage.config.custom.domain`
- `backstage.exhibitor.menu`
- `backstage.portal.settings.left.pane`
- `backstage.space.settings.left.pane`
- `backstage.floorplan.editor.left.menu`
- `backstage.event.settings.left.pane`
- `backstage.portal.settings.payments`
- `backstage.event.ticketing.payments`
- `backstage.event.abstract.editor`

Confirm the supported-location list against current Backstage extension documentation when the host platform may have changed.
