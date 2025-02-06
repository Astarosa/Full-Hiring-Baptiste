import { vi, describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import UsersToolbar from './UsersToolbar';
import { mockUsers } from '../test/mocks';
import { GithubUser } from '../types/GithubUser';

vi.mock('../assets/icons/ContentCopy', () => ({
  ContentCopy: () => <div>Copy Icon</div>
}));

vi.mock('../assets/icons/Trash', () => ({
  Trash: () => <div>Trash Icon</div>
}));

describe('UsersToolbar', () => {
  const defaultProps = {
    userList: mockUsers,
    checkedUsers: {},
    setCheckedUsers: vi.fn(),
    setUserList: vi.fn(),
    allSelected: false,
    setAllSelected: vi.fn()
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('handles select all checkbox correctly', () => {
    const setCheckedUsers = vi.fn();
    const setAllSelected = vi.fn();
    
    render(
      <UsersToolbar 
        {...defaultProps}
        setCheckedUsers={setCheckedUsers}
        setAllSelected={setAllSelected}
      />
    );

    fireEvent.click(screen.getByRole('checkbox'));

    const expectedCheckedState = {
      1: true,
      2: true
    };

    expect(setCheckedUsers).toHaveBeenCalledWith(expectedCheckedState);
    
    const setAllSelectedCallback = setAllSelected.mock.calls[0][0];

    const result = setAllSelectedCallback(false);

    expect(result).toBe(true);
  });

  it('handles deselect all correctly', () => {
    const setCheckedUsers = vi.fn();
    const setAllSelected = vi.fn();
    
    render(
      <UsersToolbar 
        {...defaultProps}
        allSelected={true}
        setCheckedUsers={setCheckedUsers}
        setAllSelected={setAllSelected}
      />
    );

    fireEvent.click(screen.getByRole('checkbox'));

    expect(setCheckedUsers).toHaveBeenCalledWith({});
    
    const setAllSelectedCallback = setAllSelected.mock.calls[0][0];
    const result = setAllSelectedCallback(true);
    expect(result).toBe(false);
  });

  it('handles copy action correctly', () => {
    const checkedUsers = { 1: true };
    const setUserList = vi.fn();
    const setCheckedUsers = vi.fn();
    const setAllSelected = vi.fn();
  
    vi.spyOn(Date, 'now').mockImplementation(() => 1234567890);
    vi.spyOn(Math, 'random').mockImplementation(() => 0.123);
  
    render(
      <UsersToolbar 
        {...defaultProps}
        checkedUsers={checkedUsers}
        setUserList={setUserList}
        setCheckedUsers={setCheckedUsers}
        setAllSelected={setAllSelected}
      />
    );
  
    fireEvent.click(screen.getByTestId('copy'));
  
    const setUserListArg = setUserList.mock.calls[0][0];
    const resultUserList = setUserListArg(mockUsers);
  
    expect(resultUserList).toHaveLength(mockUsers.length + 1);
  
    const copiedUser = resultUserList.find((user: GithubUser) => user.id === 1234567890.123);
    expect(copiedUser).toBeTruthy();
    expect(copiedUser?.login).toBe('user1');
  
    expect(setCheckedUsers).toHaveBeenCalledWith({});
    expect(setAllSelected).toHaveBeenCalledWith(false);
  
    vi.restoreAllMocks();
  });

  it('shows correct number of selected elements', () => {
    const checkedUsers = { 1: true, 2: true };
    
    render(
      <UsersToolbar 
        {...defaultProps}
        checkedUsers={checkedUsers}
      />
    );

    expect(screen.getByText('2 elements selected')).toBeInTheDocument();
  });

  it('enables action buttons when items are selected', () => {
    const checkedUsers = { 1: true };
    
    render(
      <UsersToolbar 
        {...defaultProps}
        checkedUsers={checkedUsers}
      />
    );
    
    expect(screen.getByTestId('copy')).not.toBeDisabled();
    expect(screen.getByTestId('delete')).not.toBeDisabled();
  });
});