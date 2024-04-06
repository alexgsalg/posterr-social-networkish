import { UserDisplay } from './user.model';

export interface Post {
  postId: string;
  user: UserDisplay;
  targetUser: string;
  content: string;
  likes: string[];
  createdAt: string;
  comments: Post[];
  isRepost: boolean;
  repostFrom?: UserDisplay | null;
}
