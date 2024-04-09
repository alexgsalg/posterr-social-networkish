import { ReactElement } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

import UserCard from '../../components/UserCard/user-card.component';
import style from './home.module.scss';
import FeedFilter from '../../components/FeedFilter/feed-filter.component';
import Feed from '../../components/Feed/feed.component';
import ActivityBox from '../../components/ActivityBox/activity-box.component';

function HomePage(): ReactElement {
  const { pathname } = useLocation();

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
