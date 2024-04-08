import { ReactElement } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

import UserCard from '../../components/UserCard/user-card.component';
import { selectLoggedUser } from '../../store/user/user.slice';
import { User } from '../../models/user.model';
import style from './home.module.scss';
import FeedFilter from '../../components/FeedFilter/feed-filter.component';
import Feed from '../../components/Feed/feed.component';

function HomePage(): ReactElement {
  const location = useLocation();
  const urlPath = location.pathname;
  const loggedUser = useSelector(selectLoggedUser) as User;

  return (
    <>
      <section className={style.home + ' px-2 py-4'}>
        <div className={style.home_container + ' row container-fluid mx-auto'}>
          <div className={style.home_user + ' col-12 col-md-4 col-lg-3 mb-3'}>
            <UserCard user={loggedUser} />
          </div>

          <div className={' col-12 col-md-8 col-lg-9'}>
            <FeedFilter />
            <Feed path={urlPath} loggedUser={loggedUser} />
          </div>
        </div>
      </section>

      {/* User Modal */}
      <Outlet />
    </>
  );
}

export default HomePage;
