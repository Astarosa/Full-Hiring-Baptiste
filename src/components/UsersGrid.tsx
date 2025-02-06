import { useState } from "react";
import { GithubUser } from "../types/GithubUser";
import UserCard from "./UserCard";
import UsersToolbar from "./UsersToolbar";
import { Pencil } from "../assets/icons/Pencil";

const UsersGrid = ({ users }: { users: GithubUser[] }) => {
  const [checkedUsers, setCheckedUsers] = useState<{ [key: number]: boolean }>({});
  const [userList, setUserList] = useState<GithubUser[]>(users);
  const [allSelected, setAllSelected] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const handleEditMode = () => {
    setEditMode((prev) => !prev);
    setCheckedUsers({});
    setAllSelected(false);
  };

  const handleCheck = (userId: number, checked: boolean) => {
    setCheckedUsers((prev) => ({
      ...prev,
      [userId]: checked,
    }));
  };

  return (
    <section>
      <button onClick={handleEditMode}>
        <Pencil  />
      </button>
      {editMode &&
        <UsersToolbar
          checkedUsers={checkedUsers}
          setCheckedUsers={setCheckedUsers}
          userList={userList}
          setUserList={setUserList}
          allSelected={allSelected}
          setAllSelected={setAllSelected}
        />
      }
      <article className="users-cards-grid">
        {userList.map((user) => (
          <UserCard key={user.id} user={user} editMode={editMode} isChecked={checkedUsers[user.id] || false} onCheck={handleCheck} />
        ))}
      </article>
    </section>
  );
};

export default UsersGrid;
