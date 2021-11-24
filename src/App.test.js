import App from "./App";
import { render, screen } from "@testing-library/react";
global.matchMedia =
  global.matchMedia ||
  function () {
    return {
      addListener: jest.fn(),
      removeListener: jest.fn(),
    };
  };

test("renders learn react link", () => {
  render(<App />);
  const linkElement = screen.getByText(/This is/i);
  expect(linkElement).toBeInTheDocument();
});
