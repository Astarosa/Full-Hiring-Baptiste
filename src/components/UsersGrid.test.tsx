import { render, screen, fireEvent } from "@testing-library/react";
import UsersGrid from "../components/UsersGrid";
import { GithubUser } from "../types/GithubUser";
import { vi, describe, expect, it } from "vitest";
import { mockUsers } from "../test/mocks";

vi.mock("../components/UserCard", () => ({
  default: ({ user, editMode }: { user: GithubUser; editMode: boolean }) => (
    <div data-testid="user-card">
      {editMode ? "Edit Mode Active" : "View Mode"} - {user.login}
    </div>
  ),
}));

vi.mock("../components/UsersToolbar", () => ({
  default: () => <div data-testid="users-toolbar">Users Toolbar</div>,
}));

vi.mock("../assets/icons/Pencil", () => ({
  Pencil: () => <svg data-testid="pencil-icon" />,
}));

describe("UsersGrid Component", () => {
  it("affiche le bouton d'édition et la liste des utilisateurs au départ", () => {
    render(<UsersGrid users={mockUsers} />);

    expect(screen.getByRole("button")).toBeInTheDocument();
    expect(screen.getByTestId("pencil-icon")).toBeInTheDocument();

    expect(screen.getAllByTestId("user-card").length).toBe(2);
  });

  it("active et désactive le mode édition en cliquant sur le bouton", () => {
    render(<UsersGrid users={mockUsers} />);

    const editButton = screen.getByRole("button");

    expect(screen.queryByTestId("users-toolbar")).not.toBeInTheDocument();

    fireEvent.click(editButton);
    expect(screen.getByTestId("users-toolbar")).toBeInTheDocument();
    expect(screen.getAllByTestId("user-card")[0]).toHaveTextContent("Edit Mode Active");

    fireEvent.click(editButton);
    expect(screen.queryByTestId("users-toolbar")).not.toBeInTheDocument();
    expect(screen.getAllByTestId("user-card")[0]).toHaveTextContent("View Mode");
  });
});
