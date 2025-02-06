import { render, screen } from "@testing-library/react";
import RateLimitMessage from "../components/RateLimitMessage";
import { vi, describe, it, expect } from "vitest";

vi.mock("../helpers/DateHelper", () => ({
  formattedDateToEpoch: vi.fn(() => "10 seconds"),
}));

describe("RateLimitMessage Component", () => {
  it("renders the rate limit message with formatted reset time", () => {
    const mockResetTime = 1700000000000;

    render(<RateLimitMessage resetTime={mockResetTime} />);

    expect(screen.getByText("Rate limited. Try again in 10 seconds")).toBeInTheDocument();
  });
});
