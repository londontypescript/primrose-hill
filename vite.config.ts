import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

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
        // Core, CLI and server run in Node, so their tests do too: a jsdom
        // window there would hide code that only works in a browser.
        extends: true,
        test: {
          name: "node",
          include: ["src/{core,cli,server}/**/*.test.ts"],
          environment: "node",
        },
      },
    ],
  },
});
