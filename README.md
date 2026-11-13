# nice-components

Accessible, themeable React components. Behavior and accessibility come from
[React Aria Components](https://react-spectrum.adobe.com/react-aria/components.html); styling is plain CSS driven by
`--nc-*` custom properties — no CSS-in-JS, no Tailwind, no design-system lock-in.

> **Status:** early (0.x). The API may change between minor versions until 1.0.

## Install

```sh
npm install @thomasender/nice-components
```

Peer dependencies: `react` and `react-dom` (^18.2 or ^19).

## Use

```tsx
import { Button } from '@thomasender/nice-components';
import '@thomasender/nice-components/styles.css';

<Button onPress={() => save()}>Save</Button>;
```

Note `onPress` (not `onClick`): it fires consistently for mouse, touch, keyboard and
screen readers.

## Theming

All styles live in the `nc.tokens` / `nc.components` [cascade layers](https://developer.mozilla.org/docs/Web/CSS/@layer), so
**your own un-layered CSS always wins** — no specificity fights:

```css
:root {
  --nc-color-primary: #c48e6a;
  --nc-color-primary-hover: #9a5f38;
  --nc-radius-md: 0.25rem;
}
```

Dark mode: set `data-theme="dark"` on `<html>` (or any ancestor).

Per-component tokens (e.g. `--nc-button-bg`) allow one-off changes without touching the global scale.
Only the tokens without components: `@thomasender/nice-components/tokens.css`.

## Principles

1. **Accessibility first.** WCAG 2.2 AA contrast, full keyboard support, visible focus, 44px touch targets by
   default, `prefers-reduced-motion` and forced-colors respected. Every component ships with an axe test.
2. **Easy theming.** Two-level tokens (global scale → per-component), cascade layers, light/dark.
3. **Simple API.** Few props, consistent names (`variant`, `size`), `className` and `ref` passed through.
4. **Small.** ESM only, tree-shakable, `sideEffects` limited to CSS, no runtime styling code.

## Components

| Component | Status |
| --------- | ------ |
| `Button`  | ✅     |

See the [Storybook](https://thomasender.github.io/nice-components/) for live examples.

## Development

```sh
npm install
npm run dev      # Storybook on :6006
npm run check    # lint + format + types + tests + build + package checks
```

See [CONTRIBUTING.md](./CONTRIBUTING.md).

## License

[MIT](./LICENSE)
