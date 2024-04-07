import { ReactElement, useEffect, useState } from 'react';
import { Outlet, redirect, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

import UserCard from '../../components/UserCard/user-card.component';
import { selectLoggedUser } from '../../store/user/user.slice';
import { User } from '../../models/user.model';
import style from './home.module.scss';
import FeedFilter from '../../components/FeedFilter/feed-filter.component';

function HomePage(): ReactElement {
  const location = useLocation();
  const urlPath = location.pathname;
  // const users = useSelector(selectUsers) as User[];
  const loggedUser = useSelector(selectLoggedUser) as User;
  const [showFollowingPosts, SetShowFollowingPosts] = useState<boolean>(false);

  useEffect(() => {
    if (urlPath === '/all') SetShowFollowingPosts(false);
    else if (urlPath === '/following') SetShowFollowingPosts(true);
    else SetShowFollowingPosts(false);
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
          </div>
        </div>
      </section>

      {/* User Modal */}
      <Outlet />
    </>
  );
}

export default HomePage;
