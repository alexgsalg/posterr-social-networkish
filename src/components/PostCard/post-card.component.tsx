import { ReactElement, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { formatDistance } from 'date-fns';
import {
  IoChatbubbleEllipsesOutline,
  IoHeartOutline,
  IoRepeatOutline,
} from 'react-icons/io5';

import { Post } from '../../models/post.model';
import style from './post-card.module.scss';
import { useFindUser } from '../../hooks/useFindUser';
import Comment from '../Comment/comment.component';
import {
  selectLoggedUser,
  updateLoggedUser,
} from '../../store/user/user.slice';
import PostService from '../../api/post.api';
import UserService from '../../api/user.api';
import { useAppDispatch } from '../../store/store';
import { addPost, updatePost } from '../../store/post/post.slice';
import { createRepost } from '../../utils/post.utils';
import { User } from '../../models/user.model';
import { Link, useLocation } from 'react-router-dom';
import PostReply from '../PostReply/post-reply.component';

interface IPostCard {
  post: Post;
}

function PostCard({ post }: IPostCard): ReactElement {
  const location = useLocation();

  const dispatch = useAppDispatch();
  const loggedUser = useSelector(selectLoggedUser);
  const [isliked, setIsLiked] = useState<boolean>(false);
  const [currentPost, setCurrentPost] = useState<Post>(post);

  const postUser = useFindUser(post.user);
  const postTargetUser = useFindUser(post.targetUser);
  const repostTargetUser = useFindUser(post.repost?.userId);
  const isAuthor = post.user === loggedUser?.id;
  const liked = post.likes.some((id) => id === postUser?.id);

  useEffect(() => {
    const liked = post.likes.some((id) => id === postUser?.id);
    setIsLiked(liked);
  });

  const onLikeAction = async () => {
    if (!postUser || !post) return;

    const updatedPost = currentPost;
    if (isliked) {
      updatedPost.likes = updatedPost.likes.filter(
        (likes: string) => likes !== postUser?.id,
      );
      setIsLiked(false);
    } else {
      updatedPost.likes.push(postUser?.id);
      setIsLiked(true);
    }
    setCurrentPost(updatedPost);
    await PostService.updatePost(currentPost)
      .then((post) => {
        dispatch(updatePost(post));
      })
      .catch((err) => console.log('error', err));
  };

  const onRepost = async () => {
    if (!postUser || !post || !loggedUser) return;

    const newRepost = createRepost(post, loggedUser.id);
    const userClone: User = JSON.parse(JSON.stringify(loggedUser));
    let newPostId: string = '';

    await PostService.addPost(newRepost)
      .then((post: Post) => {
        dispatch(addPost(post));
        newPostId = post.id;
      })
      .catch((err) => console.log('error', err));

    if (newPostId) {
      userClone.posts.push(newPostId);
      const userUpdated = userClone;

      await UserService.updateUser(userUpdated)
        .then((user: User) => {
          dispatch(updateLoggedUser(user));
        })
        .catch((err) => console.log('error', err));
    }
  };

  return (
    <article className={style.post_card + ' rounded shadow-sm'}>
      <div className={style.post + ' p-3'}>
        {postUser && (
          <header
            className={style.post_header + ' d-flex align-items-center gap-2'}>
            <img
              src={postUser?.avatar}
              className={style.post_header__avatar + ' cursor-pointer'}
              alt="user photo"
              aria-hidden="true"
            />
            <div className={style.post_header_details}>
              <div className={style.post_header__title + ' text-light'}>
                <h3
                  className={
                    style.post_header__title + ' d-inline-block cursor-pointer'
                  }>
                  <Link
                    className={style.post__link}
                    to={`/user/${post.user}`}
                    state={{ background: location }}>
                    {postUser?.name}
                  </Link>
                </h3>
                {post.targetUser && postTargetUser ? (
                  <span>
                    {' > '}
                    <Link
                      className={style.post__link}
                      to={`/user/${postTargetUser.id}`}
                      state={{ background: location }}>
                      {postTargetUser?.name}
                    </Link>
                  </span>
                ) : null}
              </div>
              <small
                className={style.post_header__timestamp + ' text-secondary'}>
                {formatDistance(new Date(currentPost!.createdAt), new Date(), {
                  addSuffix: true,
                })}
              </small>
            </div>
          </header>
        )}

        <div className={post.repost ? style.post_body_repost : style.post_body}>
          {post.repost && (
            <div className="d-flex align-items-center gap-2">
              <img
                src={repostTargetUser?.avatar}
                className={style.post_body_repost__image}
                alt="user photo"
                aria-hidden="true"
              />
              <small className={style.post_body_repost__name}>
                {repostTargetUser?.name} - Repost
              </small>
            </div>
          )}
          <p className="text-light my-3">{currentPost?.content}</p>
        </div>

        <footer className={style.post_footer}>
          <button className={style.post_footer_box + ' p-1 pe-none'}>
            <IoChatbubbleEllipsesOutline aria-hidden="true" />
            {currentPost?.comments?.length}
          </button>
          {!isAuthor && (
            <button
              className={
                style.post_footer_box + ' me-1 p-1' + (liked ? ' active' : '')
              }
              onClick={onLikeAction}>
              <IoHeartOutline aria-hidden="true" /> {currentPost?.likes?.length}
            </button>
          )}
          {!isAuthor && (
            <button
              className={style.post_footer_box + ' p-1'}
              onClick={onRepost}>
              <IoRepeatOutline aria-hidden="true" />
            </button>
          )}
        </footer>
      </div>

      {/* Comment */}
      {post.comments.length > 0 && (
        <div className={style.comment_structure}>
          {post.comments.map((comment, idx) => (
            <Comment key={idx} commentId={comment} />
          ))}
        </div>
      )}

      {/* White a comment */}
      <PostReply targetId={post.id} />
    </article>
  );
}

export default PostCard;
