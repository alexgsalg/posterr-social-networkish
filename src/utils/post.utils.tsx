import { v4 as uuid } from 'uuid';
import { Post } from '../models/post.model';

export const createPost = (
  msg: string,
  userId: string,
  target: string | null = null,
): Post => {
  return {
    id: uuid(),
    user: userId,
    targetUser: target || null,
    content: msg,
    likes: [],
    createdAt: new Date().toISOString(),
    comments: [],
    repost: null,
  };
};

export const createRepost = (post: Post, userId: string): Post => {
  return {
    id: uuid(),
    user: userId,
    targetUser: null,
    content: post.content,
    likes: [],
    createdAt: new Date().toISOString(),
    comments: [],
    repost: {
      postId: post.id,
      userId: post.user,
    },
  };
};
