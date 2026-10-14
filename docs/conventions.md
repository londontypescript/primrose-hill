# Conventions

This project's stack conventions: the framework and libraries it uses, and
the patterns to follow with them. Every agent reads this file before writing
code, whatever tool it runs in.

Add a convention when the user settles one, in a line or two, with the
reason where it isn't obvious. Keep rules about how work is done in
AGENTS.md; this file is about the code.

- **Stack:** React with TypeScript on Vite, installed with pnpm.
- **Layout:** one package (ADR 0001). `src/core/` fetches, caches and
  queries; `src/cli/` is the `primrose` command; `src/server/` serves the
  dashboard; `src/web/` is the dashboard. Everything in `src/` outside
  `web/` runs in Node (`tsconfig.node.json`, no DOM types), so a new folder
  is checked as Node code by default; web runs in the browser
  (`tsconfig.web.json`).
- **Checks:** `tsc -b` type-checks, oxlint lints (a warning fails it too), oxfmt formats with its
  defaults (`pnpm format` to fix), and Vitest runs web tests in jsdom with
  Testing Library and every other test under `src/` in Node. Test what a
  user can see and do, through roles and text, not component internals.
