import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Header from './Header';

describe("Header Component", () => {
  it("renders the heading correctly", () => {
    render(<Header />);
    
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Github Search");
  });
});