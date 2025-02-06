import { GithubUser } from "../types/GithubUser";

interface UserCardProps {
  editMode: boolean;
  user: GithubUser;
  isChecked: boolean;
  onCheck: (id: number, checked: boolean) => void;
}

const UserCard = ({ editMode, user, isChecked, onCheck }: UserCardProps) => {
  return (
    <article data-testid="user-card" className="user-card">
      { editMode &&
        <input
          type="checkbox"
          checked={isChecked}
          onChange={(e) => onCheck(user.id, e.target.checked)}
        />
      }
      <img className="user-avatar" src={user.avatar_url} alt={user.login} />
      <div className="user-infos">
        <p>{user.id}</p>
        <h2>{user.login}</h2>
      </div>
      <a className="user-link" href={user.html_url}>View profile</a>
    </article>
  );
};

export default UserCard;