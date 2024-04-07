import { ReactElement } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { format } from 'date-fns';

import { IoLocationOutline, IoCalendarOutline } from 'react-icons/io5';
import { User } from '../../models/user.model';
import style from './user-card.module.scss';

interface IUserCard {
  user: User;
}

function UserCard({ user }: IUserCard): ReactElement {
  const location = useLocation();

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
            style.card_body_info + ' d-flex flex-wrap col-12 col-sm-8 col-md-12'
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
              <div className="col-6 px-2">
                <p className={'text-secondary'}>
                  <span className={'text-light fw-medium pe-2'}>
                    {user?.followers?.length}
                  </span>
                  Followers
                </p>
              </div>
              <div className="col-6 px-2 text-end">
                <p className={'text-secondary'}>
                  <span className={'text-light fw-medium pe-2'}>
                    {user?.following?.length}
                  </span>
                  Following
                </p>
              </div>
              <div className="col-4 px-2">
                <p className={'text-secondary'}>
                  <span className={'text-light fw-medium pe-2'}>
                    {user?.posts?.length}
                  </span>
                  Posts
                </p>
              </div>
              <div className="col-8 px-2 text-end">
                <p className={'text-secondary'}>
                  <IoCalendarOutline />
                  <span className={'text-light ps-2'}>
                    {format(user?.createdAt, 'MMMM d, yyyy')}
                  </span>
                </p>
              </div>
            </div>

            <div className="text-center">
              <Link
                className="btn btn-clear text-light"
                to="/user/1223"
                state={{ background: location }}>
                View profile
              </Link>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

export default UserCard;
