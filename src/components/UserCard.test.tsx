import { vi, describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import UserCard from "../components/UserCard";
import { mockUser } from "../test/mocks";

describe("UserCard Component", () => {
  it("show user informations", () => {
    render(<UserCard editMode={false} user={mockUser} isChecked={false} onCheck={vi.fn()} />);

    expect(screen.getByText("testuser")).toBeInTheDocument();
    expect(screen.getByText("12345")).toBeInTheDocument();

    const avatar = screen.getByRole("img") as HTMLImageElement;
    expect(avatar).toHaveAttribute("src", mockUser.avatar_url);
    expect(avatar).toHaveAttribute("alt", mockUser.login);

    const profileLink = screen.getByRole("link") as HTMLAnchorElement;
    expect(profileLink).toHaveAttribute("href", mockUser.html_url);
  });

  it("doesn't display the checkbox in non edit mode", () => {
    render(<UserCard editMode={false} user={mockUser} isChecked={false} onCheck={vi.fn()} />);
    
    expect(screen.queryByRole("checkbox")).not.toBeInTheDocument();
  });

  it("display the checkbox in edit mode", () => {
    render(<UserCard editMode={true} user={mockUser} isChecked={false} onCheck={vi.fn()} />);
    
    expect(screen.getByRole("checkbox")).toBeInTheDocument();
  });

  it("checked and unchecked correctly the check box", () => {
    const onCheckMock = vi.fn();
  
    const { rerender } = render(
      <UserCard 
        editMode={true} 
        user={mockUser} 
        isChecked={false} 
        onCheck={onCheckMock} 
      />
    );
    
    const checkbox = screen.getByRole("checkbox") as HTMLInputElement;
    
    expect(checkbox).not.toBeChecked();
    
    fireEvent.click(checkbox);
    expect(onCheckMock).toHaveBeenCalledWith(mockUser.id, true);
    
    rerender(
      <UserCard 
        editMode={true} 
        user={mockUser} 
        isChecked={true} 
        onCheck={onCheckMock} 
      />
    );
    
    fireEvent.click(checkbox);
    expect(onCheckMock).toHaveBeenCalledWith(mockUser.id, false);
  });
});
