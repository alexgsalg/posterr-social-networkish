import { ReactElement } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

import style from './user-card.module.scss';
// store
import { selectLoggedUser } from '../../store/user/user.slice';
// models
import { User } from '../../models/user.model';
// imports
import { IoLocationOutline, IoPerson } from 'react-icons/io5';
import { format } from 'date-fns';

/**
 * Renders the card used on the Homepage that contains basic information about the Logged user.
 */
function UserCard(): ReactElement {
  const location = useLocation();
  const user = useSelector(selectLoggedUser);

  if (user) {
    return (
      <article className={style.card + ' pt-md-4 shadow'}>
        <span className={style.card__topeffect + ' h-25'}></span>
        <div
          className={
            style.card_body + ' d-flex flex-wrap align-items-center p-3'
          }>
          <picture
            className={
              style.card_body_picture + ' text-center col-12 col-sm-4 col-md-12'
            }>
            <img
              src={user?.avatar ?? './assets/images/avatar.png'}
              alt="User avatar"
              className={style.card_body_picture__img}
            />
          </picture>

          <div
            className={
              style.card_body_info +
              ' d-flex flex-wrap col-12 col-sm-8 col-md-12'
            }>
            <div className="col-12 text-left text-center">
              <h1 className={style.card_body__name + ' text-light fw-medium'}>
                {user?.name}
              </h1>
              <p className={style.card_body__location + ' text-light'}>
                <IoLocationOutline className="text-secondary me-1" />
                {user?.location}
              </p>
            </div>

            <div className="col-12">
              <div className={'row gy-3 mt-3 mb-4 mx-0'}>
                <div className="col-4 col-md-6 col-lg-6 px-2 text-center text-md-start">
                  <small className={'text-secondary'}>
                    <span className={'text-light fw-medium pe-2'}>
                      {user?.followers?.length}
                    </span>
                    Followers
                  </small>
                </div>
                <div className="col-4 col-md-6 col-lg-6 px-2 text-center text-md-end">
                  <small className={'text-secondary'}>
                    <span className={'text-light fw-medium pe-2'}>
                      {user?.following?.length}
                    </span>
                    Following
                  </small>
                </div>
                <div className="col-4 col-md-4 col-lg-4 px-2 text-center text-md-start">
                  <small className={'text-secondary'}>
                    <span className={'text-light fw-medium pe-2'}>
                      {user?.posts?.length}
                    </span>
                    Posts
                  </small>
                </div>
                <div className="col-12 col-sm-6 col-md-8 col-lg-8 px-2">
                  <small
                    className={
                      'text-secondary d-flex align-items-center justify-content-center justify-content-md-end'
                    }>
                    <IoPerson />
                    <span className={'text-light ps-2'}>
                      {format(user?.createdAt, 'MMMM d, yyyy')}
                    </span>
                  </small>
                </div>
              </div>

              <div className="text-center">
                <Link
                  className="btn btn-clear text-light"
                  to={`/user/${user.id}`}
                  state={{ background: location }}>
                  View profile
                </Link>
              </div>
            </div>
          </div>
        </div>
      </article>
    );
  } else {
    return <></>;
  }
}

export default UserCard;
