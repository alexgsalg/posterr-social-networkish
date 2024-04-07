export interface User {
  id: string;
  name: string;
  location: string;
  avatar: string;
  following: string[];
  followers: string[];
  posts: string[];
  createdAt: string;
}

export interface UserDisplay {
  id: string;
  name: string;
  avatar: string;
}
