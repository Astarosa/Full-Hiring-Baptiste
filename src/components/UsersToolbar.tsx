import { GithubUser } from "../types/GithubUser";
import { ContentCopy } from "../assets/icons/ContentCopy";
import { Trash } from "../assets/icons/Trash";

interface UsersToolbarProps {
  userList: GithubUser[];
  checkedUsers: { [key: number]: boolean };
  setCheckedUsers: React.Dispatch<React.SetStateAction<{ [key: number]: boolean }>>;
  setUserList: React.Dispatch<React.SetStateAction<GithubUser[]>>;
  allSelected: boolean;
  setAllSelected: React.Dispatch<React.SetStateAction<boolean>>;
}

const UsersToolbar = ({ checkedUsers, setCheckedUsers, userList, setUserList, allSelected, setAllSelected }: UsersToolbarProps) => {
  const checkedCount = Object.values(checkedUsers).filter(Boolean).length;

  const handleToggleSelectAll = () => {
    if (allSelected) {
      setCheckedUsers({});
    } else {
      const newCheckedState = userList.reduce((acc: { [key: number]: boolean }, user) => {
        acc[user.id] = true;
        return acc;
      }, {});
      setCheckedUsers(newCheckedState);
    }
    setAllSelected((prev) => !prev);
  };

  const handleDeleteChecked = () => {
    setUserList((prev) => prev.filter((user) => !checkedUsers[user.id]));
    setCheckedUsers({});
    setAllSelected(false);
  };

  const handleCopyChecked = () => {
    const selectedUsers = userList.filter((user) => checkedUsers[user.id]);
    const duplicatedUsers = selectedUsers.map((user) => ({
      ...user,
      id: Date.now() + Math.random(),
    }));

    setUserList((prev) => [...prev, ...duplicatedUsers]);
    setCheckedUsers({});
    setAllSelected(false);
  };

  return (
    <div className="users-toolbar">
      <div className="users-toolbar__select">
        <input type="checkbox" onChange={handleToggleSelectAll} checked={allSelected} />
        <p>{checkedCount} elements selected</p>
      </div>
      <div className="users-toolbar__actions">
        <button data-testid="copy" onClick={handleCopyChecked} disabled={checkedCount === 0}>
          <ContentCopy />
        </button>
        <button data-testid="delete" onClick={handleDeleteChecked} disabled={checkedCount === 0}>
          <Trash />
        </button>
      </div>
    </div>
  );
};

export default UsersToolbar;
