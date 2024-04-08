export interface Post {
  id: string;
  user: string;
  targetUser: string | null;
  content: string;
  likes: string[];
  createdAt: string;
  comments: string[];
  isComment: boolean;
  repost: Repost | null;
}

export interface Repost {
  postId: string;
  userId: string;
}
