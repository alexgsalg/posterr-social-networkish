import { Post } from '../models/post.model';

export const createPost = (
  msg: string,
  userId: string,
  target: string | null = null,
): Post => {
  return {
    id: '',
    user: userId,
    targetUser: target || null,
    content: msg,
    likes: [],
    createdAt: new Date().toISOString(),
    comments: [],
    isComment: false,
    repost: null,
  };
};

export const createRepost = (post: Post, userId: string): Post => {
  return {
    id: '',
    user: userId,
    targetUser: null,
    content: post.content,
    likes: [],
    createdAt: new Date().toISOString(),
    comments: [],
    isComment: false,
    repost: {
      postId: post.id,
      userId: post.user,
    },
  };
};
