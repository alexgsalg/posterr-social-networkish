import { ReactElement, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import style from './post-reply.module.scss';
import { User } from '../../models/user.model';
import { Post } from '../../models/post.model';
import PostService from '../../api/post.api';
import UserService from '../../api/user.api';
import { addComment, addPost, updatePost } from '../../store/post/post.slice';
import { useAppDispatch } from '../../store/store';
import {
  selectLoggedUser,
  updateLoggedUser,
} from '../../store/user/user.slice';
import { createPost } from '../../utils/post.utils';
import { useLocation } from 'react-router-dom';
import { useFindPost } from '../../hooks/useFindPost';

interface IPostReply {
  targetId?: string;
}

/**
 * Box to white a comment on a post
 * @param targetId - The id of the target post
 */
function PostReply({ targetId }: IPostReply): ReactElement {
  const { pathname } = useLocation();
  const dispatch = useAppDispatch();

  const loggedUser = useSelector(selectLoggedUser);
  const targetPost = useFindPost(targetId);
  const [message, setMessage] = useState<string>('');
  const [charCount, setCharCount] = useState<number>(0);

  useEffect(() => {
    resetComponent();
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

    if (!ev.target) return;
    ev.target.style.height = '42px';
    ev.target.style.height = ev.target.scrollHeight + 'px';
  };

  const onCommentSubmit = async () => {
    if (!message || !loggedUser) return;

    const newPost = createPost(
      message,
      loggedUser.id,
      targetId ? targetId : null,
    );
    let newReplyId: string = '';

    // Add Comment to api and store
    await PostService.addComment(newPost)
      .then((post: Post) => {
        dispatch(addComment(post));
        newReplyId = post.id;
      })
      .catch((err) => console.log('error', err));

    if (newReplyId) {
      // add CommentID to the target post
      await updateTargetPost(newReplyId);

      // add PostID to LoggedUser
      await updateLoggedUserPostList(newReplyId);
    }
    resetComponent();
  };

  const updateTargetPost = async (newReplyId: string) => {
    const targetClone: Post = JSON.parse(JSON.stringify(targetPost));
    targetClone.comments.push(newReplyId);
    await PostService.updatePost(targetClone)
      .then((post: Post) => {
        dispatch(updatePost(post));
      })
      .catch((err) => console.log('error', err));
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
    <form className={style.post_reply + ' d-flex p-3 gap-3'}>
      <div className="col position-relative">
        <textarea
          className={style.post_reply__input + ' rounded'}
          name="reply"
          placeholder="White a reply"
          value={message}
          onChange={(ev) => onMessageInput(ev)}></textarea>
        <small className={style.post_reply__counter}>{charCount}/777</small>
      </div>
      <div className="col-3 col-lg-2">
        <button
          className={style.post_reply__button + ' btn py-2 w-100'}
          type="button"
          disabled={message?.length <= 0}
          onClick={onCommentSubmit}>
          Reply
        </button>
      </div>
    </form>
  );
}

export default PostReply;
