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
  dashboard; `src/web/` is the dashboard. Core, CLI and server run in Node
  (`tsconfig.node.json`, no DOM types); web runs in the browser
  (`tsconfig.web.json`).
- **Checks:** `tsc -b` type-checks, oxlint lints (a warning fails it too), oxfmt formats with its
  defaults (`pnpm format` to fix), and Vitest runs core, CLI and server tests
  in Node and web tests in jsdom with Testing Library. Test what a user can
  see and do, through roles and text, not component internals.
