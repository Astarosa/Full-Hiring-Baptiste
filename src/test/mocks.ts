import { GithubUser } from "../types/GithubUser";

export const mockUser: GithubUser = {
  login: "testuser",
  id: 12345,
  node_id: "MDQ6VXNlcjEyMzQ1",
  avatar_url: "https://example.com/avatar.png",
  gravatar_id: "",
  url: "https://api.github.com/users/testuser",
  html_url: "https://github.com/testuser",
  followers_url: "https://api.github.com/users/testuser/followers",
  following_url: "https://api.github.com/users/testuser/following{/other_user}",
  gists_url: "https://api.github.com/users/testuser/gists{/gist_id}",
  starred_url: "https://api.github.com/users/testuser/starred{/owner}{/repo}",
  subscriptions_url: "https://api.github.com/users/testuser/subscriptions",
  organizations_url: "https://api.github.com/users/testuser/orgs",
  repos_url: "https://api.github.com/users/testuser/repos",
  events_url: "https://api.github.com/users/testuser/events{/privacy}",
  received_events_url: "https://api.github.com/users/testuser/received_events",
  type: "User",
  user_view_type: "public",
  site_admin: false,
  score: 100,
};

export const mockUsers: GithubUser[] = [
  {
    login: "user1",
    id: 1,
    node_id: "MDQ6VXNlcjE=",
    avatar_url: "https://example.com/avatar1.png",
    gravatar_id: "",
    url: "https://api.github.com/users/user1",
    html_url: "https://github.com/user1",
    followers_url: "https://api.github.com/users/user1/followers",
    following_url: "https://api.github.com/users/user1/following{/other_user}",
    gists_url: "https://api.github.com/users/user1/gists{/gist_id}",
    starred_url: "https://api.github.com/users/user1/starred{/owner}{/repo}",
    subscriptions_url: "https://api.github.com/users/user1/subscriptions",
    organizations_url: "https://api.github.com/users/user1/orgs",
    repos_url: "https://api.github.com/users/user1/repos",
    events_url: "https://api.github.com/users/user1/events{/privacy}",
    received_events_url: "https://api.github.com/users/user1/received_events",
    type: "User",
    user_view_type: "public",
    site_admin: false,
    score: 90,
  },
  {
    login: "user2",
    id: 2,
    node_id: "MDQ6VXNlcjI=",
    avatar_url: "https://example.com/avatar2.png",
    gravatar_id: "",
    url: "https://api.github.com/users/user2",
    html_url: "https://github.com/user2",
    followers_url: "https://api.github.com/users/user2/followers",
    following_url: "https://api.github.com/users/user2/following{/other_user}",
    gists_url: "https://api.github.com/users/user2/gists{/gist_id}",
    starred_url: "https://api.github.com/users/user2/starred{/owner}{/repo}",
    subscriptions_url: "https://api.github.com/users/user2/subscriptions",
    organizations_url: "https://api.github.com/users/user2/orgs",
    repos_url: "https://api.github.com/users/user2/repos",
    events_url: "https://api.github.com/users/user2/events{/privacy}",
    received_events_url: "https://api.github.com/users/user2/received_events",
    type: "User",
    user_view_type: "public",
    site_admin: false,
    score: 85,
  },
];