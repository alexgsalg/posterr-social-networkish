import { ReactElement, useEffect, useState } from 'react';
import { Post } from '../../models/post.model';
import { useSelector } from 'react-redux';
import { selectPosts } from '../../store/post/post.slice';
import { User } from '../../models/user.model';
import style from './feed.module.scss';
import PostCard from '../PostCard/post-card.component';
import { selectLoggedUser } from '../../store/user/user.slice';
import { getUserIdFromPath } from '../../utils/path.utils';
import { sortPots } from '../../utils/post.utils';

interface IFeed {
  path: string;
}

function Feed({ path }: IFeed): ReactElement {
  const allPosts = useSelector(selectPosts) as Post[];
  const loggedUser = useSelector(selectLoggedUser);
  const [isloadingFeed, setIsloadingFeed] = useState<boolean>(false);
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
        return el.user === userId;
      }) || [];
    setPosts(sortPots(filtered));
  };

  /** Loading state */
  if (isloadingFeed)
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
