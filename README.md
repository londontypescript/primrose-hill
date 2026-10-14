# primrose-hill

An overview of every London TypeScript repo, run locally by any member: where
each milestone stands, what is in the way of each goal, which decisions are
waiting on someone, and what closed or merged recently. It reads GitHub
through your own `gh` sign-in, so you see exactly the repos you can see, and
it never writes to GitHub.

**Under development: there is nothing to run yet.** Version 0.1.0 will bring
a `primrose` command line, a skill that teaches Claude Code and Codex to use
it, and a local dashboard. The design is in
[ADR 0001](docs/adr/0001-local-overview-of-the-organisation.md) and the work
in [the 0.1.0 plan](docs/plans/0.1.0.md). This README will say how to run it
once there is something to run.

## Working on it

Read [AGENTS.md](AGENTS.md) and [docs/conventions.md](docs/conventions.md)
first. Install with `pnpm install`; `pnpm gate` runs every check CI runs.
