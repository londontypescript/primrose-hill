import react from "@vitejs/plugin-react";
import { configDefaults, defineConfig } from "vitest/config";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    // Only src: agents' worktrees live inside the repo (.claude/worktrees),
    // and Vitest would otherwise run their copies of the tests too.
    projects: [
      {
        extends: true,
        test: {
          name: "web",
          include: ["src/web/**/*.test.{ts,tsx}"],
          environment: "jsdom",
          setupFiles: ["./src/web/test/setup.ts"],
        },
      },
      {
        // Everything else in src (core, CLI, server, and any folder added
        // later) runs in Node, so its tests do too: a jsdom window there
        // would hide code that only works in a browser. Matching by
        // exclusion means a new folder can't fall outside both projects.
        extends: true,
        test: {
          name: "node",
          include: ["src/**/*.test.{ts,tsx}"],
          exclude: [...configDefaults.exclude, "src/web/**"],
          environment: "node",
        },
      },
    ],
  },
});
