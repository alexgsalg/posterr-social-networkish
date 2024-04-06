export interface User {
  userId: string;
  userName: string;
  location: string;
  profilePicture: string;
  profileUrl: string;
  following: string[];
  followers: string[];
  posts: string[];
  createdAt: string;
}

export interface UserDisplay {
  userId: string;
  userName: string;
  profilePicture: string;
}
