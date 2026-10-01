# Backstage frame client reference

The extension runs in a Backstage iframe. Load the Sigma SDK and Backstage client in order:

```html
<script src="https://static.zohocdn.com/backstage/v1.0/javascript/sdk/ZSDK.min.js"></script>
<script src="https://static.zohocdn.com/backstage/v1.0/javascript/sdk/bs-frame-client.js"></script>
```

## Initialization

```javascript
async function initializeWidget() {
  try {
    const app = await ZBackstage.extension.init();
    return app;
  } catch (error) {
    console.error("Unable to initialize Backstage widget", error);
    throw error;
  }
}
```

Initialization augments the Sigma app with metadata and host APIs. Typical metadata includes `portalId`, `eventId`, and `user`; the exact context depends on the widget location.

Do not use the underlying Sigma `get`, `set`, `remove`, or direct request contract. Use the APIs below.

## Backstage v3 API

Operations are exposed at runtime as `app.api.<operationId>`.

- Pass path parameters positionally in the declared order.
- The host injects the current `portalId`.
- Pass query values and options in the final object.
- Put POST, PUT, and DELETE payloads under `body`.

```javascript
const event = await app.api.getEvent(app.eventId);
const attendees = await app.api.listAttendees(app.eventId, {
  page: 1,
  perPage: 50
});
const exhibitor = await app.api.createExhibitor(app.eventId, {
  body: {
    exhibitor_category_id: categoryId,
    company_name: companyName,
    contact: { first_name: firstName, email }
  }
});
```

GET operations are cached. Use `{ skipCache: true }` for a fresh call or:

```javascript
app.cache.clear("events");
app.cache.clear();
```

Verify operation names and parameter order against the current Backstage extension API catalog; do not guess an operation name.

## Connector-backed external requests

```javascript
const response = await app.request({
  apiType: "api",
  url: "https://zohoapis.com/crm/v8/Contacts/search?email=user@example.com",
  connection: "readzcrm",
  method: "GET"
});
```

- Add the hostname to `whiteListedDomains`.
- Declare the connector in `dcConnectors`.
- Keep the `connection` value equal to the configured connector link name.
- Never embed credentials or access tokens in source.

## Extension storage

```javascript
await app.storage.set("preferences", { module: "Contacts" });
const preferences = await app.storage.get("preferences");
await app.storage.delete("preferences");
```

Values must be JSON serializable. Storage is extension scoped.

## Host UI

```javascript
app.ui.notify("Saved successfully", { type: "success" });

const confirmed = await app.ui.confirm({
  title: "Discard changes?",
  content: "Unsaved changes will be lost.",
  confirmText: "Discard",
  cancelText: "Keep editing"
});

await app.ui.alert({
  title: "Unable to continue",
  content: "Complete the required fields first."
});
```

Other lifecycle methods:

```javascript
await app.ui.openPane("addExhibitor", data);
await app.ui.closePane();
await app.ui.closeModal();
app.reload();
```

`openPane` opens a named first-party Backstage surface. It is different from rendering another extension widget.

## Render another manifest widget

```javascript
await app.widget.render("details-widget");
```

The target ID must exist in the same manifest and use `viewMode: "sidePane"` or `viewMode: "modal"`.

## Parent actions and host events

Register an action using `${widgetId}-${method}`:

```javascript
app.action.register("background-widget-sync", async (payload) => {
  return { status: "done", count: payload.ids.length };
});
```

Subscribe using event constants returned at initialization:

```javascript
function handleResponses(payload) {
  console.log("Responses loaded", payload);
}

app.event.on(
  ZBackstage.extension.EVENTS.ON_SITE_FORM_RESPONSES_LOADED,
  handleResponses
);
```

Use `app.action.deregister` and `app.event.off` when a long-lived widget replaces handlers.

## UI and error pattern

```javascript
async function save(button, saveOperation) {
  button.disabled = true;

  try {
    const result = await saveOperation();
    app.ui.notify("Saved successfully", { type: "success" });
    return result;
  } catch (error) {
    app.ui.notify("Unable to save", { type: "error" });
    console.error("Extension save failed", error);
    throw error;
  } finally {
    button.disabled = false;
  }
}
```

- Show a visible state while initializing, loading, empty, successful, and failed.
- Use `textContent` for host and remote values.
- Validate user input before API calls.
- Do not log secrets, connector responses containing credentials, or unnecessary personal data.
- Confirm destructive actions.
