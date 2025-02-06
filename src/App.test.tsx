import { render, screen } from "@testing-library/react";
import App from "./App";
import { vi, describe, it, expect } from "vitest";

vi.mock("../components/Header", () => ({
  default: () => <header data-testid="header">Mocked Header</header>,
}));

vi.mock("../pages/Users", () => ({
  default: () => <div data-testid="users">Mocked Users Page</div>,
}));

describe("App Component", () => {
  it("rend le composant Header", () => {
    render(<App />);
    expect(screen.getByTestId("header")).toBeInTheDocument();
  });

  it("rend le composant Users", () => {
    render(<App />);
    expect(screen.getByTestId("users")).toBeInTheDocument();
  });

  it("s'assure que le layout principal est bien structuré", () => {
    render(<App />);
    const mainElement = screen.getByRole("main");
    expect(mainElement).toBeInTheDocument();
  });
});
