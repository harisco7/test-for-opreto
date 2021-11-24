import { render, screen, fireEvent } from "@testing-library/react";
import Page from "./Page";

global.matchMedia =
  global.matchMedia ||
  function () {
    return {
      addListener: jest.fn(),
      removeListener: jest.fn(),
    };
  };

test("rendering the year component", async () => {
  render(<Page />);
  jest.setTimeout(1000);
  fireEvent.click(await screen.findByTestId("next"));
  expect(await screen.findByTestId("prev")).toBeDefined();
});
