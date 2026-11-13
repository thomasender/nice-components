# Contributing

## Setup

Node 22+ (`.nvmrc` pins 24). `npm install`, then `npm run dev` for Storybook.

## Adding a component

Create `src/components/<Name>/` with:

- `<Name>.tsx` — built on a React Aria Components primitive where one exists
- `<Name>.styles.css` — wrapped in `@layer nc.components`, only `--nc-*` tokens, no raw colors
- `<Name>.test.tsx` — behavior tests **and** an `axe` test (`expect(await axe(container)).toHaveNoViolations()`)
- `<Name>.stories.tsx` — all variants/states; Storybook's a11y addon fails on violations
- `index.ts` — re-export; then add it to `src/index.ts`

Rules: relative imports use explicit `.js` endings (required for correct published types); public props are
documented with TSDoc; `className` and `ref` are forwarded; user-visible default strings must be overridable via props.

## Before you push

`npm run check` must pass (CI runs the same).

## Releasing

Every user-facing change needs a changeset: `npm run changeset`. Merging to `main` makes the release workflow open a
"Version Packages" PR; merging that publishes to npm (with provenance) and tags the release.
