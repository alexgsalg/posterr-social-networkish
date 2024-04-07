import { ReactElement } from 'react';
import { Post } from '../../models/post.model';
// import style from './feed.module.scss';

interface IFeed {
  posts: Post[];
  loadingFeed: boolean;
}

function Feed({ posts, loadingFeed }: IFeed): ReactElement {
  console.log('Feed > posts:', posts);

  if (loadingFeed) return <div>Loading...</div>;
  return <div>feed</div>;
}

export default Feed;
