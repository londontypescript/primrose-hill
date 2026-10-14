import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach } from "vitest";

// Without globals, Testing Library can't register its own cleanup, so each
// test would see the previous test's rendered DOM.
afterEach(cleanup);
