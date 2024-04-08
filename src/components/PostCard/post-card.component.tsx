import { ReactElement } from 'react';
import { Post } from '../../models/post.model';

interface IPostCard {
  post: Post;
}

function PostCard({ post }: IPostCard): ReactElement {
  return (
    <div>
      {post.user} {post.content}
    </div>
  );
}

export default PostCard;
