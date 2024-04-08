import { useSelector } from 'react-redux';
import { selectComments } from '../store/post/post.slice';
import { Post } from '../models/post.model';

export const useFindComment = (
  id: string | null | undefined,
): Post | undefined => {
  const allComments = useSelector(selectComments);

  if (!id) return undefined;
  const comment = allComments.find((comment) => comment.id === id) || undefined;

  return comment;
};
