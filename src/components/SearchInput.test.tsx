import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import SearchInput from "./SearchInput";

describe("SearchInput Component", () => {
  it("renders the input field with correct placeholder and value", () => {
    render(<SearchInput query="React" setQuery={vi.fn()} />);

    const inputElement = screen.getByRole("textbox");

    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveAttribute("placeholder", "Search input");
    expect(inputElement).toHaveValue("React");
  });

  it("calls setQuery when input value changes", () => {
    const setQueryMock = vi.fn();
    render(<SearchInput query="" setQuery={setQueryMock} />);

    const inputElement = screen.getByRole("textbox");

    fireEvent.change(inputElement, { target: { value: "React Testing" } });

    expect(setQueryMock).toHaveBeenCalledTimes(1);
    expect(setQueryMock).toHaveBeenCalledWith("React Testing");
  });
});
