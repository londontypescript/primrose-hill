# Conventions

This project's stack conventions: the framework and libraries it uses, and
the patterns to follow with them. Every agent reads this file before writing
code, whatever tool it runs in.

Add a convention when the user settles one, in a line or two, with the
reason where it isn't obvious. Keep rules about how work is done in
AGENTS.md; this file is about the code.

- **Stack:** React with TypeScript on Vite, installed with pnpm.
- **Checks:** `tsc -b` type-checks, oxlint lints, oxfmt formats with its
  defaults (`pnpm format` to fix), and Vitest runs the tests in jsdom with
  Testing Library. Test what a user can see and do, through roles and text,
  not component internals.
