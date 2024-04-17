import { ReactElement, useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

import style from './home.module.scss';
import UserService from '../../api/user.api';
import api from '../../api/axios';
// store
import ActivityBox from '../../components/ActivityBox/activity-box.component';
import { useAppDispatch } from '../../store/store';
import { selectPostCount, setPosts } from '../../store/post/post.slice';
import {
  setUsers,
  logInUser,
  selectUserCount,
} from '../../store/user/user.slice';
import {
  resetTimeout,
  selectHasTimerEnded,
} from '../../store/general/general.slice';
// components
import UserCard from '../../components/UserCard/user-card.component';
import FeedFilter from '../../components/FeedFilter/feed-filter.component';
import Feed from '../../components/Feed/feed.component';

function HomePage(): ReactElement {
  const { pathname } = useLocation();
  const dispatch = useAppDispatch();
  const userCount = useSelector(selectUserCount);
  const postsCount = useSelector(selectPostCount);
  const refetchData = useSelector(selectHasTimerEnded);
  const [isLoading, SetLoading] = useState<boolean>(false);

  useEffect(() => {
    SetLoading(true);
    initUsers();
    initPosts();

    if (refetchData) {
      dispatch(resetTimeout());
    }
    SetLoading(false);
  });

  const initUsers = async () => {
    if (userCount <= 0 || refetchData) {
      const usersList = await UserService.getUsers();
      dispatch(setUsers(usersList));
      dispatch(logInUser(usersList[0]));
    }
  };

  const initPosts = async () => {
    if (postsCount <= 0 || refetchData) {
      const response = await api.get('/post');
      const posts = response.data;
      dispatch(setPosts(posts));
    }
  };

  /** Loading state */
  if (isLoading)
    return (
      <div className="w-full d-flex justify-content-center p-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );

  /** Default state */
  return (
    <>
      <section className={style.home + ' px-2 py-4'}>
        <div className={style.home_container + ' row container-fluid mx-auto'}>
          <div className={style.home_user + ' col-12 col-md-4 col-lg-3 mb-3'}>
            <UserCard />
          </div>

          <div className={' col-12 col-md-8 col-lg-9'}>
            <FeedFilter />
            {pathname === '/all' ? <ActivityBox /> : null}
            <Feed path={pathname} />
          </div>
        </div>
      </section>

      {/* User Modal */}
      <Outlet />
    </>
  );
}

export default HomePage;
