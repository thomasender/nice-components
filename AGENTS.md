# nice-components

Public React component library (`@thomasender/nice-components`), reused by `spiri-events-v` and
`freie-musiklehrer`. See README.md (principles) and CONTRIBUTING.md (how to add a component).

- Stack: React Aria Components + plain CSS tokens (`--nc-*`, cascade layers), TypeScript, Vite library mode,
  Vitest + vitest-axe, Storybook, Changesets.
- `npm run check` = lint, prettier, tsc, tests, build, publint/attw. Run before finishing any task.
- Relative imports need explicit `.js` extensions (published `.d.ts` must resolve under node16).
- Side-effect CSS imports are stripped from `.d.ts` by `scripts/strip-css-imports.mjs`; CSS ships as `dist/styles.css`.
- No domain logic (events, teachers, Firebase) in this repo — only generic UI.
- Public repo: never commit secrets, `.env*` files, or project-specific data.
- Every user-facing change needs a changeset (`npm run changeset`).
