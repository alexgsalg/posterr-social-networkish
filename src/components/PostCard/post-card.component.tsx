import { ReactElement } from 'react';
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
import { selectLoggedUser } from '../../store/user/user.slice';

interface IPostCard {
  post: Post;
}

function PostCard({ post }: IPostCard): ReactElement {
  const loggedUser = useSelector(selectLoggedUser);
  const postUser = useFindUser(post.user);
  const postTargetUser = useFindUser(post.targetUser);
  const repostTargetUser = useFindUser(post.repost?.userId);
  const isAuthor = post.user === loggedUser?.id;
  const liked = post.likes.some((id) => id === postUser?.id);

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
                  {postUser?.name}
                </h3>
                {post.targetUser && postTargetUser ? (
                  <span>
                    {' >'} {postTargetUser?.name}
                  </span>
                ) : null}
              </div>
              <small
                className={style.post_header__timestamp + ' text-secondary'}>
                {formatDistance(new Date(post?.createdAt), new Date(), {
                  addSuffix: true,
                })}
              </small>
            </div>
          </header>
        )}

        <div
          className={style.post_body + 'pt-3 pb-2' + (post.repost && ' ps-2')}>
          {post.repost && (
            <div className="d-flex align-items-center gap-2 mb-2">
              <img
                src={repostTargetUser?.avatar}
                className={style.post_body__repost_image}
                alt="user photo"
                aria-hidden="true"
              />
              <small className="text-muted">
                {repostTargetUser?.name} - Repost
              </small>
            </div>
          )}
          <p className="text-light my-3">{post?.content}</p>
        </div>

        <footer className={style.post_footer}>
          <button className={style.post_footer_box + ' p-1 pe-none'}>
            <IoChatbubbleEllipsesOutline aria-hidden="true" />
            {post?.comments?.length}
          </button>
          {!isAuthor && (
            <button
              className={
                style.post_footer_box + ' me-1 p-1' + (liked ? ' active' : '')
                // (click)="onLikection()"
              }>
              <IoHeartOutline aria-hidden="true" /> {post?.likes?.length}
            </button>
          )}
          {!isAuthor && (
            <button className={style.post_footer_box + ' p-1'}>
              {/* (click)="onRepost()"> */}
              <IoRepeatOutline aria-hidden="true" />
            </button>
          )}
        </footer>
      </div>

      {/* Comment */}
      {post.comments.length > 0 && (
        <div className={style.comment_structure + ' border-top border-1'}>
          {post.comments.map((comment, idx) => (
            <Comment key={idx} comment={comment} />
          ))}
        </div>
      )}

      {/*// <form className="post_reply d-flex p-3 gap-3 border-top border-1">
  //   <div className="col">
  //     <textarea
  //       className="post_reply__input rounded"
  //       type="text"
  //       name="reply"
  //       placeholder="White a reply"
  //       [formControl]="replyMsg"
  //       (keyup)="autoGrowTextZone($event)"></textarea>
  //   </div>
  //   <div className="col-3 col-lg-2">
  //     <button
  //       className="btn btn-primary py-2 text-white w-100"
  //       type="button"
  //       [disabled]="replyMsg.invalid"
  //       (click)="onComment()">
  //       Reply
  //     </button>
  //   </div>
  // </form>*/}
    </article>
  );
}

export default PostCard;
