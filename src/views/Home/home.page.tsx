import { ReactElement } from 'react';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

import UserCard from '../../components/UserCard/user-card.component';
import { selectLoggedUser } from '../../store/user/user.slice';
import { User } from '../../models/user.model';
import style from './home.module.scss';

function HomePage(): ReactElement {
  // const users = useSelector(selectUsers) as User[];
  const loggedUser = useSelector(selectLoggedUser) as User;

  return (
    <>
      <section className={style.home + ' px-2 py-4'}>
        <div className={style.home_container + ' container-fluid'}>
          <div className={style.container_left + ' col-12 col-md-4 col-lg-3'}>
            <UserCard user={loggedUser} />
          </div>

          <div
            className={
              style.container_left + ' col-12 col-md-8 col-lg-9'
            }></div>
        </div>
      </section>

      {/* User Modal */}
      <Outlet />
    </>
  );
}

export default HomePage;
