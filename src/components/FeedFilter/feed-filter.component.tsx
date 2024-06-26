import { ReactElement } from 'react';
import { NavLink } from 'react-router-dom';

import style from './feed-filter.module.scss';

/**
 * Renders all post filters and redirects to the respective path
 */
function FeedFilter(): ReactElement {
  return (
    <nav className={style.nav + ' nav mb-4'}>
      <NavLink
        className={({ isActive }) =>
          isActive ? style.nav__item_active : style.nav__item
        }
        to="/all">
        All posts
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          isActive ? style.nav__item_active : style.nav__item
        }
        to="/following">
        Following
      </NavLink>
    </nav>
  );
}

export default FeedFilter;
