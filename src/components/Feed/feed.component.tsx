import { ReactElement, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import style from './feed.module.scss';
// store
import { selectPosts } from '../../store/post/post.slice';
import { selectLoggedUser } from '../../store/user/user.slice';
// models
import { Post } from '../../models/post.model';
// components
import PostCard from '../PostCard/post-card.component';
// imports
import { sortPots } from '../../utils/post.utils';

interface IFeed {
  path: string;
}

/**
 * Sort and pass a list of posts based on the current path:
 * - If route is a/ll, pass all posts;
 * - If route is /following, pass post from users that tha loggedUser follows;
 * - If route is user, pass all post from and related to target user;
 * @param path - Current path.
 */
function Feed({ path }: IFeed): ReactElement {
  const allPosts = useSelector(selectPosts) as Post[];
  const loggedUser = useSelector(selectLoggedUser);
  const [isLoadingFeed, setIsloadingFeed] = useState<boolean>(false);
  const [posts, setPosts] = useState<Post[]>([]);

  /** Filter posts depending on the url */
  useEffect(() => {
    setIsloadingFeed(true);
    if (path === '/all') {
      setPosts(allPosts);
    } else if (path === '/following') {
      filterByFollowing();
    } else if (path.includes('/user/')) {
      filterByUser();
    }
    setIsloadingFeed(false);
  }, [path, allPosts]);

  const filterByFollowing = () => {
    const allFollowing =
      allPosts.filter((el) => {
        return loggedUser?.following.includes(el.user);
      }) || [];
    setPosts(sortPots(allFollowing));
  };

  const filterByUser = () => {
    const slicedPath = path.split('/');
    const userId = slicedPath[slicedPath.length - 1];
    const filtered =
      allPosts.filter((el) => {
        return el.user === userId || el.targetUser === userId;
      }) || [];
    setPosts(sortPots(filtered));
  };

  /** Loading state */
  if (isLoadingFeed)
    return (
      <div className="w-full d-flex justify-content-center p-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );

  /** Default state */
  return (
    <div className={style.postlist}>
      {posts.map((post, idx) => (
        <PostCard key={idx} post={post} />
      ))}
    </div>
  );
}

export default Feed;
