import { ReactElement } from 'react';
import style from './header.module.scss';

import { IoNotificationsOutline } from 'react-icons/io5';
import Logo from '../../assets/images/logo.png';

function HeaderComponent(): ReactElement {
  return (
    <header className={style.header + ' bg-dark py-3'}>
      <div className="container d-flex justify-content-between align-items-center">
        <div
          className={
            style.header_brand +
            ' col-6 col-md-4 col-lg-3 d-flex justify-content-start align-items-center'
          }>
          <img
            className={style.header_brand__img}
            src={Logo}
            alt="Posterr logo/"
          />
          <span className={style.header__name}>Posterr</span>
        </div>

        <div className={style.header_actions + ' col-6 col-md-4 col-lg-3'}>
          <div className={style.header_actions__avatar}>
            <span className={style.header_actions__avatar_name}>
              Name of user
            </span>
            <img
              className={style.header_actions__avatar_img}
              src="https://avatar.iran.liara.run/public/boy"
              alt="User Avatar"
            />
          </div>
          <button className={style.header_actions__icon + ' btn btn-clear'}>
            <IoNotificationsOutline />
          </button>
        </div>
      </div>
    </header>
  );
}

export default HeaderComponent;
