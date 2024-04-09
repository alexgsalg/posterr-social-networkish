import { ReactElement } from 'react';
import style from './header.module.scss';

import { IoNotificationsOutline, IoMailOutline } from 'react-icons/io5';
import Logo from '../../assets/images/logo.png';
import { useSelector } from 'react-redux';
import { selectLoggedUser } from '../../store/user/user.slice';
import Button from '../Button/button.component';

function HeaderComponent(): ReactElement {
  const user = useSelector(selectLoggedUser);

  return (
    <header className={style.header + ' bg-dark p-3'}>
      <div className="container-fluid d-flex justify-content-between align-items-center px-2">
        <div
          className={
            style.header_brand +
            ' col-2 col-md-4 col-lg-3 d-flex justify-content-start align-items-center'
          }>
          <img
            className={style.header_brand__img}
            src={Logo}
            alt="Posterr logo/"
          />
          <span className={style.header__name}>Posterr</span>
        </div>

        <div className={style.header_actions + ' col-10 col-md-4 col-lg-4'}>
          <div
            className={
              style.header_actions__avatar + ' border-end border-secondary pe-3'
            }>
            <span className={style.header_actions__avatar_name}>
              {user?.name}
            </span>
            <img
              className={style.header_actions__avatar_img}
              src={user?.avatar}
              alt="User Avatar"
            />
          </div>
          <Button
            variant="clear"
            addClass={style.header_actions__icon + ' text-light'}>
            <IoNotificationsOutline aria-hidden="true" />
          </Button>
          <Button
            variant="clear"
            addClass={style.header_actions__icon + ' text-light'}>
            <IoMailOutline aria-hidden="true" />
          </Button>
        </div>
      </div>
    </header>
  );
}

export default HeaderComponent;
