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
import { selectLoggedUser } from '../../store/user/user.slice';
import PostService from '../../api/post.api';
import { useAppDispatch } from '../../store/store';
import { updatePost } from '../../store/post/post.slice';
import { Link, useLocation } from 'react-router-dom';
import PostReply from '../PostReply/post-reply.component';
import RepostCard from '../RepostCard/repost-card.component';
import Button from '../Button/button.component';

interface IPostCard {
  post: Post;
}

function PostCard({ post }: IPostCard): ReactElement {
  const location = useLocation();
  const dispatch = useAppDispatch();

  const loggedUser = useSelector(selectLoggedUser);
  const [isliked, setIsLiked] = useState<boolean>(false);
  const [isCommentBox, setIsCommentBox] = useState<boolean>(true);

  const postUser = useFindUser(post.user);
  const postTargetUser = useFindUser(post.targetUser);
  const isAuthor = post.user === loggedUser?.id;
  const liked = post.likes.some((id) => id === postUser?.id);

  useEffect(() => {
    const liked = post.likes.some((id) => id === postUser?.id);
    setIsLiked(liked);
  });

  const onLikeAction = async () => {
    if (!postUser || !post) return;

    const updatedPost: Post = JSON.parse(JSON.stringify(post));
    if (isliked) {
      updatedPost.likes = updatedPost.likes.filter(
        (likes: string) => likes !== postUser?.id,
      );
      setIsLiked(false);
    } else {
      updatedPost.likes.push(postUser?.id);
      setIsLiked(true);
    }
    // setCurrentPost(updatedPost);
    await PostService.updatePost(updatedPost)
      .then((post) => {
        dispatch(updatePost(post));
      })
      .catch((err) => console.log('error', err));
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
                {formatDistance(new Date(post!.createdAt), new Date(), {
                  addSuffix: true,
                })}
              </small>
            </div>
          </header>
        )}

        <div className={style.post_body}>
          {post?.content ? (
            <p className="text-light my-3">{post?.content}</p>
          ) : null}

          {/* Repost */}
          {post.repost && <RepostCard target={post.repost} />}
        </div>

        <footer className={style.post_footer}>
          {!isAuthor && (
            <Button
              variant="clear"
              addClass={`${style.post_footer_counter} ${liked ? style.active : ''}`}
              onClick={() => onLikeAction()}>
              <IoHeartOutline aria-hidden="true" /> {post?.likes?.length}
            </Button>
          )}
          <Button
            variant="clear"
            addClass={style.post_footer_counter + ' pe-none'}>
            <IoChatbubbleEllipsesOutline aria-hidden="true" />{' '}
            {post?.comments?.length}
          </Button>

          <div className={style.post_footer_box}>
            <Button
              variant={isCommentBox ? 'primary' : 'secondary'}
              outline={true}
              addClass={style.post_footer_box__btn}
              onClick={() => setIsCommentBox(true)}>
              <IoChatbubbleEllipsesOutline aria-hidden="true" /> Comment
            </Button>
            {!isAuthor && (
              <Button
                variant={isCommentBox ? 'secondary' : 'primary'}
                outline={true}
                addClass={style.post_footer_box__btn}
                onClick={() => setIsCommentBox(false)}>
                <IoRepeatOutline aria-hidden="true" /> Repost
              </Button>
            )}
          </div>
        </footer>
      </div>

      {/* White a comment */}
      <PostReply
        targetId={post.id}
        type={isCommentBox ? 'comment' : 'repost'}
        repostTarget={post}
      />

      {/* Comment */}
      {post.comments.length > 0 && (
        <div className={style.comment_structure}>
          {post.comments.map((comment, idx) => (
            <Comment key={idx} commentId={comment} />
          ))}
        </div>
      )}
    </article>
  );
}

export default PostCard;
