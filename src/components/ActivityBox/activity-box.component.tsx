import { ReactElement, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import style from './ativity-box.module.scss';
import { User } from '../../models/user.model';
import { Post } from '../../models/post.model';
import PostService from '../../api/post.api';
import UserService from '../../api/user.api';
import { addPost, selectDailyQuota } from '../../store/post/post.slice';
import { useAppDispatch } from '../../store/store';
import {
  selectLoggedUser,
  updateLoggedUser,
} from '../../store/user/user.slice';
import { createPost } from '../../utils/post.utils';
import { useLocation } from 'react-router-dom';
import { getUserIdFromPath } from '../../utils/path.utils';
import { IoPaperPlane } from 'react-icons/io5';

/**
 * Box to white a new post depending on the route:
 * - If route is home, post on personal feed;
 * - If route is user, post on the target user's feed;
 * @param targetId - The id of the target post
 */
function ActivityBox(): ReactElement {
  const { pathname } = useLocation();
  const dispatch = useAppDispatch();

  const loggedUser = useSelector(selectLoggedUser);
  const dailyQuota = useSelector(selectDailyQuota);
  const [message, setMessage] = useState<string>('');
  const [targetUserId, setTargetUserId] = useState<string>('');
  const [charCount, setCharCount] = useState<number>(0);
  // actions

  useEffect(() => {
    resetComponent();
    setTargetUserId(getUserIdFromPath(pathname));
  }, [pathname]);

  const resetComponent = () => {
    setMessage('');
    setCharCount(0);
  };

  const onMessageInput = (ev: any) => {
    const msg = ev.target.value;
    if (msg.length === 777) return;

    setMessage(ev.target.value);
    setCharCount(msg.length);
  };

  const onSubmit = async () => {
    if (!message || !loggedUser) return;

    const post = createPost(message, loggedUser.id, targetUserId);
    let newPostId: string = '';

    await PostService.addPost(post)
      .then((post: Post) => {
        dispatch(addPost(post));
        newPostId = post.id;
      })
      .catch((err) => console.log('error', err));

    if (newPostId) {
      updateLoggedUserPostList(newPostId);
    }
  };

  const updateLoggedUserPostList = async (newReplyId: string) => {
    const userClone: User = JSON.parse(JSON.stringify(loggedUser));
    userClone.posts.push(newReplyId);
    const userUpdated = userClone;

    await UserService.updateUser(userUpdated)
      .then((user: User) => {
        dispatch(updateLoggedUser(user));
      })
      .catch((err) => console.log('error', err));
  };

  return (
    <form className={style.activity + ' rounded-sm mb-5'}>
      <div className="position-relative">
        <textarea
          className={style.activity__text + ' rounded p-4'}
          name="activity-box"
          disabled={dailyQuota === 5}
          maxLength={777}
          placeholder={
            dailyQuota === 5
              ? 'You reached your daily post quota'
              : 'White a reply'
          }
          value={message}
          onChange={(ev) => onMessageInput(ev)}></textarea>
      </div>
      <div className="d-flex justify-content-end align-items-center gap-3 p-3">
        <small className={style.activity__counter}>{charCount}/777</small>
        <button
          className={
            style.activity__btn + ' col-8 col-sm-6 col-md-4 col-lg-3 btn'
          }
          type="button"
          disabled={dailyQuota === 5 || message.length <= 0}
          onClick={onSubmit}>
          <IoPaperPlane />
          Repost
        </button>
      </div>
    </form>
  );
}

export default ActivityBox;
