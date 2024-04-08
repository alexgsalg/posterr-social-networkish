import { useSelector } from 'react-redux';
import { selectPosts } from '../store/post/post.slice';
import { Post } from '../models/post.model';

export const useFindPost = (
  id: string | null | undefined,
): Post | undefined => {
  const allPosts = useSelector(selectPosts);

  if (!id) return undefined;
  const post = allPosts.find((post) => post.id === id) || undefined;

  return post;
};
