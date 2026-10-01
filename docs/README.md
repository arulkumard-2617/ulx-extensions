# Eventz SDK Extension Builder

SDK reference bundled with `ulx-extention-builder` for building host extension packages.

## Contents

```text
sdk-extension-builder/
├── SKILL.md
├── MANIFEST.md
├── CLIENT.md
└── rules/
    ├── sdk-extension-html.mdc
    ├── sdk-extension-client.mdc
    └── sdk-extension-manifest.mdc
```

## Install in a project

1. Copy this folder to:

   ```text
   <project>/.cursor/skills/sdk-extension-builder/
   ```

2. Copy the three files under `rules/` to:

   ```text
   <project>/.cursor/rules/
   ```

The skill remains usable without separately installing the rules because `SKILL.md` reads the bundled copies. Installing the rules also makes the focused guidance available independently.

## Install as a personal skill

Copy this folder to:

```text
~/.cursor/skills/sdk-extension-builder/
```

Project rules still belong under each project's `.cursor/rules/` directory.

## Use

Ask Cursor to create, scaffold, or update an Eventz Backstage SDK extension, or explicitly request the `sdk-extension-builder` skill.

The bundle covers:

- `plugin-manifest.json`
- Widget location and `viewMode` validation
- Compiled PrimeReact + Tailwind pages
- Required ZSDK and frame-client dependencies
- Backstage APIs, storage, UI, actions, events, and connector requests
- Package structure and verification

Connector IDs, data-center mappings, API permissions, and deployment credentials are environment-specific and are intentionally not included.
