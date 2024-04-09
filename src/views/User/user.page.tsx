import { ReactElement, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router';
import Modal from 'react-bootstrap/Modal';
import Feed from '../../components/Feed/feed.component';
import { useLocation } from 'react-router-dom';
import style from './user.module.scss';
import { getUserIdFromPath } from '../../utils/path.utils';
import { useSelector } from 'react-redux';
import {
  selectLoggedUser,
  selectUsers,
  updateLoggedUser,
  updateOneUser,
} from '../../store/user/user.slice';
import { User } from '../../models/user.model';
import UserService from '../../api/user.api';
import {
  IoCalendarOutline,
  IoLocationOutline,
  IoPersonAddOutline,
  IoPersonRemoveOutline,
} from 'react-icons/io5';
import { format } from 'date-fns';
import Button from '../../components/Button/button.component';
import { useAppDispatch } from '../../store/store';
import ActivityBox from '../../components/ActivityBox/activity-box.component';

function UserPage(): ReactElement {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const dispatch = useAppDispatch();

  const loggedUser = useSelector(selectLoggedUser);
  const allUsers = useSelector(selectUsers);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [following, setFollowing] = useState<boolean>(false);
  const [isLoggedUser, setIsLoggedUser] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const [userNameTag, setUserNameTag] = useState<string | undefined>('');

  useEffect(() => {
    setIsLoading(true);
    const userId = getUserIdFromPath(pathname);

    if (loggedUser?.id === userId) {
      setUser(loggedUser);
      setIsLoggedUser(true);
    } else {
      const user = allUsers.find((user) => user.id === userId) || undefined;
      // If there is NO user
      if (!user) {
        setUser(null);
        setIsLoggedUser(true);
      }

      // If there is user
      setUser(user as User);
      setIsLoggedUser(false);
    }

    const username = user?.name.split(' ').join('').toLocaleLowerCase();
    setUserNameTag(username);
    setIsLoading(false);
  }, [pathname]);

  /** Update following state */
  useEffect(() => {
    const isFollowing =
      loggedUser?.following.some((following) => following === user?.id) ||
      false;
    setFollowing(isFollowing);
  }, [user, following]);

  const onFollowAction = async () => {
    if (!user || !loggedUser) return;

    // clone users
    const newLoggedUser: User = JSON.parse(JSON.stringify(loggedUser));
    const newUser: User = JSON.parse(JSON.stringify(user));

    // check if follows or not
    if (following) {
      newLoggedUser.following = newLoggedUser.following.filter(
        (user: string) => user !== newUser.id,
      );
      newUser.followers = newUser.followers.filter(
        (user: string) => user !== newLoggedUser.id,
      );
    } else {
      newLoggedUser.following.push(user?.id);
      newUser.followers.push(loggedUser?.id);
    }

    try {
      await onUpdateUser(newUser, false);
      await onUpdateUser(newLoggedUser, true);

      setFollowing(!following);
    } catch (error) {
      console.log(error);
    }
  };

  const onUpdateUser = async (user: User, isLogged: boolean) => {
    await UserService.updateUser(user)
      .then((updatedUser) => {
        if (isLogged) {
          dispatch(updateLoggedUser(updatedUser));
        } else {
          dispatch(updateOneUser(updatedUser));
          setUser(updatedUser);
        }
      })
      .catch((err) => console.error(err));
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

  /** Empty User */
  if (!isLoading && !user)
    return (
      <div className="w-full d-flex justify-content-center p-5">
        <h2 className="display-1">No User Found</h2>
      </div>
    );

  /** Default state */
  return (
    <div
      className={'modal show'}
      style={{ display: 'block', position: 'initial' }}>
      <Modal
        show={true}
        size="lg"
        centered
        onHide={() => navigate(-1)}
        contentClassName="bg-poster-primary">
        <Modal.Header closeButton>
          <span className={style.user__topeffect + ' h-25 pe-none'}></span>
        </Modal.Header>
        <Modal.Body>
          <header
            className={
              style.user_header + ' d-flex flex-wrap align-items-end py-2'
            }>
            {/* Header avatar */}
            <picture className={style.user_header_picture + ' col-12 col-sm-4'}>
              <img
                src={user?.avatar ?? './assets/images/avatar.png'}
                alt="User avatar"
                className={style.user_header_picture__img}
              />
            </picture>

            {/* Header buttons */}
            {!isLoggedUser ? (
              <div className="col col-lg-auto order-lg-3 d-flex justify-content-end">
                {following ? (
                  <Button variant="light" onClick={() => onFollowAction()}>
                    <IoPersonRemoveOutline className="me-1" />
                    Follow
                  </Button>
                ) : (
                  <Button variant="primary" onClick={() => onFollowAction()}>
                    <IoPersonAddOutline className="me-1" />
                    Follow
                  </Button>
                )}
              </div>
            ) : null}

            {/* Header details */}
            <div className={' col-12 col-lg row mx-0 order-lg-2'}>
              <div className="col-auto">
                <h1
                  className={
                    style.user_header__name + ' text-light fw-medium mb-1'
                  }>
                  {user?.name}
                </h1>
                <p className={'text-light'}>@{userNameTag}</p>
              </div>

              <div className="col row mx-0">
                <div className="col-auto">
                  <small className={style.user_header__detail}>
                    <span className={'text-light fw-medium pe-2'}>
                      {user?.followers?.length}
                    </span>
                    Followers
                  </small>
                </div>

                <div className="col-auto">
                  <small className={style.user_header__detail}>
                    <span className={'text-light fw-medium pe-2'}>
                      {user?.following?.length}
                    </span>
                    Following
                  </small>
                </div>

                <div className="col-auto">
                  <small className={style.user_header__detail}>
                    <span className={'text-light fw-medium pe-2'}>
                      {user?.posts?.length}
                    </span>
                    Posts
                  </small>
                </div>

                <div className="col-auto">
                  <p className={style.user_header__detail}>
                    <IoLocationOutline className="text-secondary me-1" />
                    {user?.location}
                  </p>
                </div>

                <div className="col-auto">
                  <small className={style.user_header__detail}>
                    <IoCalendarOutline />
                    <span className={'ps-2'}>
                      {format(user!.createdAt, 'MMMM d, yyyy')}
                    </span>
                  </small>
                </div>
              </div>
            </div>
          </header>

          <ActivityBox />

          <Feed path={pathname} />
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default UserPage;
