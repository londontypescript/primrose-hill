# ADR 0001: A local overview of the organisation, fetched fresh, advisory only

Date: 2026-10-14. Status: proposed.

## Context

London TypeScript runs several repos (nine on 2026-10-14), and checking each
one by hand every day to see where development stands, and how milestones
and issues in different repos affect each other, takes the maintainer's
time. As more repos start (grand-union waits on temple-bar), that gets
harder. primrose-hill is meant to give any member an overview of every repo,
suggest what to work on, and answer "what if" and "does this already exist"
questions.

Options weighed with the maintainer:

- **A plain agent prompt each morning** (an agent with the `gh` CLI builds a
  page). Tried on 2026-10-14: the content was useful, but a run took about
  ten minutes, mostly building the page and fetching everything from
  scratch, and its full dependency map was too dense to read.
- **GitHub Projects.** It already holds an organisation-wide board and native
  links between issues, but it doesn't reason over them, find links nobody
  recorded, or answer questions.
- **Eight parallel experiments** (prompt only, skill plus CLI, SQL, MCP,
  GitHub-native, static page, local page with what-if, morning briefing,
  and a Claude Code mod). Dropped: the maintainer wants one agreed design to
  build, not eight to judge.
- **MCP server or CLI plus skill** for agents. A CLI with a skill costs an
  agent's context nothing until it's needed, works in Claude Code and Codex
  alike, and is tested like any other code. MCP is left until an agent that
  can't run commands needs it.
- **Syncing only what changed.** ChatGPT Sol 6.1's adversarial review found
  it fragile (relationship changes that don't touch an issue's update time,
  deleted and transferred issues, partial failures). A full fetch of every
  repo's open state with its relationships took 6.7 seconds and about 10 of
  5,000 hourly GraphQL points, so at this size there is nothing to sync.

## Decision

- **Local and read-only.** A member clones the repo and runs it. It reads
  GitHub through the member's own `gh` sign-in, so each member sees exactly
  the repos they can see, and it never writes to GitHub.
- **Advisory only.** It suggests; people decide. GitHub's own links are the
  recorded facts. No recorded blocker never means unblocked: unknown is
  shown as unknown.
- **One package** with `src/core/` (fetch, cache, queries), `src/cli/` (the
  `primrose` command, JSON output with a schema version), `src/server/` and
  `src/web/` (the dashboard). No pnpm workspace: one package keeps one gate
  and one set of scripts.
- **Fetched fresh.** Every refresh fetches the open state in full; only the
  history of what closed or merged is fetched by date. Refreshes happen
  when the dashboard opens or someone asks, never on a timer and never on
  every CLI call.
- **Cache** in SQLite through `node:sqlite`, in the user's data folder
  outside the clone, readable only by the user, one per GitHub host and
  account. A repo the account can no longer see is hidden at once.
- **Question first.** The page leads with what is in the way of each goal
  and counts that open into lists, not a map of everything. A goal is a
  milestone that must close, listed in `primrose.config.json`; private goals
  go in an uncommitted local file. A decision waiting on someone is an issue
  labelled `needs-decision`, waiting on its assignee.
- **The local server is locked down:** loopback only, Host and Origin
  checked, a per-session token in a header, strict Content Security Policy,
  nothing loaded from outside, issue text never rendered as HTML.
- **No AI in 0.1.0.** In 0.2.0 the tool may start the member's own agent
  (`claude -p` or `codex exec`) on their subscription, with no API keys, but
  only once a test shows the started agent can do nothing beyond the
  `primrose` CLI, whatever an issue's text tells it. Issue text may go to
  Anthropic or OpenAI that way; private repos' text only for members who can
  see them, with a notice on the page. If the limits can't be shown, members
  ask their own agent through the CLI and skill instead.

## What would end it

- The organisation growing until a full fetch is slow or costly: then
  incremental sync, with per-repo checkpoints and a full reconciliation.
- Members needing a shared view without running anything: then a snapshot
  built by CI, deciding first how private repos stay private.
- An agent the members use that can't run commands: then an MCP server over
  the same core.
- GitHub adding reasoning over its own links that answers these questions.
