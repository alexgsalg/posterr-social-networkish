import { ReactElement } from 'react';
// import style from './header.style.scss';
import Logo from '../../assets/images/logo.png';
import Avatar from '../../assets/images/avatar.png';

function HeaderComponent(): ReactElement {
  return (
    <header className="header bg-dark py-3">
      <div className="container d-flex justify-content-between align-items-center">
        <div className="header-brand col-6 col-md-4 col-lg-3 d-flex justify-content-start align-items-center">
          <img className="header-brand__img" src={Logo} alt="Posterr logo/" />
          <span className="header-brand__name">Posterr</span>
        </div>

        <div className="header-actions  col-6 col-md-4 col-lg-3 d-flex justify-content-end align-items-center">
          <button className="header-actions__icon btn btn-clear text-light">
            {/* <ion-icon name="notifications-outline"></ion-icon> */}
          </button>
          <div className="header-actions__avatar">
            <img
              className="header-actions__img"
              src={Avatar}
              alt="User Avatar"
            />
          </div>
        </div>
      </div>
    </header>
  );
}

export default HeaderComponent;
