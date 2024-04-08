import { isSameDay } from 'date-fns';
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

export const createRepost = (msg: string, post: Post, userId: string): Post => {
  return {
    id: '',
    user: userId,
    targetUser: null,
    content: msg,
    likes: [],
    createdAt: new Date().toISOString(),
    comments: [],
    isComment: false,
    repost: {
      postId: post.id,
      userId: post.user,
      content: post.content,
    },
  };
};

export const handleQuota = (): boolean => {
  const nowDate = new Date();
  if (localStorage.getItem('dailyQuota')) {
    const quota: { day: Date; submissions: number } = JSON.parse(
      localStorage.getItem('dailyQuota') || '',
    );
    // check if is same day
    if (isSameDay(new Date(quota.day), nowDate)) {
      // Check if submitted or not the daily quota
      if (quota.submissions === 5) return false;
      quota.submissions++;
      localStorage.setItem('dailyQuota', JSON.stringify(quota));
      return true;
    } else {
      // start new day quota
      const quota: { day: Date; submissions: number } = {
        day: nowDate,
        submissions: 1,
      };
      localStorage.setItem('dailyQuota', JSON.stringify(quota));
      return true;
    }
  }
  // start new day quota
  else {
    const quota: { day: Date; submissions: number } = {
      day: nowDate,
      submissions: 1,
    };
    localStorage.setItem('dailyQuota', JSON.stringify(quota));
  }
  return true;
};
