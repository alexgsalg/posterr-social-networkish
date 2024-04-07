import { ReactElement, useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

import UserCard from '../../components/UserCard/user-card.component';
import { selectLoggedUser } from '../../store/user/user.slice';
import { User } from '../../models/user.model';
import style from './home.module.scss';
import FeedFilter from '../../components/FeedFilter/feed-filter.component';
import Feed from '../../components/Feed/feed.component';
import { Post } from '../../models/post.model';

function HomePage(): ReactElement {
  const location = useLocation();
  const urlPath = location.pathname;
  const loggedUser = useSelector(selectLoggedUser) as User;

  const [showFollowingPosts, setShowFollowingPosts] = useState<boolean>(false);
  const [isloadingFeed, setIsloadingFeed] = useState<boolean>(false);
  const [posts, setPosts] = useState<Post[]>([]);

  // TODO: create hook to fetch posts from api and store it

  // TODO: create hook to filter posts by showFollowingPosts

  useEffect(() => {
    setIsloadingFeed(true);
    if (urlPath === '/all') setShowFollowingPosts(false);
    else if (urlPath === '/following') setShowFollowingPosts(true);
    else setShowFollowingPosts(false);

    setIsloadingFeed(false);
  }, [urlPath]);

  return (
    <>
      <section className={style.home + ' px-2 py-4'}>
        <div className={style.home_container + ' row container-fluid mx-0'}>
          <div className={' col-12 col-md-4 col-lg-4'}>
            <UserCard user={loggedUser} />
          </div>

          <div className={' col-12 col-md-8 col-lg-8'}>
            <FeedFilter />
            <Feed posts={posts} loadingFeed={isloadingFeed} />
          </div>
        </div>
      </section>

      {/* User Modal */}
      <Outlet />
    </>
  );
}

export default HomePage;
