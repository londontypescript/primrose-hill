import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, test } from "vitest";
import App from "./App";

test("the counter goes up by one on each click", async () => {
  const user = userEvent.setup();
  render(<App />);
  const button = screen.getByRole("button", { name: /count is/i });

  expect(button).toHaveTextContent("Count is 0");
  await user.click(button);
  await user.click(button);
  expect(button).toHaveTextContent("Count is 2");
});
