import { ReactElement } from 'react';

import style from './comment.module.scss';
import { Post } from '../../models/post.model';
import { useFindUser } from '../../hooks/useFindUser';
import { formatDistance } from 'date-fns';
import { useSelector } from 'react-redux';
import { selectLoggedUser } from '../../store/user/user.slice';
import { IoHeartOutline } from 'react-icons/io5';
import { useFindComment } from '../../hooks/useFindComment';
import { Link } from 'react-router-dom';

interface IComment {
  commentId: string;
}

/**
 * Component that displays a comment to a post
 * @param commentId - The id of the comment to be displayed
 */
function Comment({ commentId }: IComment): ReactElement {
  const loggedUser = useSelector(selectLoggedUser);
  const comment = useFindComment(commentId);
  console.log('Comment > comment:', comment);
  const commentUser = useFindUser(comment?.user);
  const isAuthor = loggedUser?.posts.some((post) => post === commentId);

  return (
    <article className={style.comment}>
      <header
        className={style.comment_header + ' d-flex align-items-center gap-2'}>
        <img
          src={commentUser?.avatar}
          className={style.comment_header__avatar}
          alt="user photo"
          aria-hidden="true"
        />
        <div className={style.comment_header_details}>
          <h3
            className={style.comment_header__title + ' d-block cursor-pointer'}>
            <Link
              className={style.comment__link}
              to={`/user/${comment?.user}`}
              state={{ background: location }}>
              {loggedUser?.name}
            </Link>
          </h3>
          <small
            className={style.comment_header__timestamp + ' text-secondary'}>
            {formatDistance(new Date(comment!.createdAt), new Date(), {
              addSuffix: true,
            })}
          </small>
        </div>
      </header>

      <div className={style.comment_body + ' pt-3 pb-2'}>
        <p className="text-light">{comment?.content}</p>
      </div>

      <footer className={style.comment_footer + ' d-flex align-items-center'}>
        {!isAuthor && (
          <button className={style.comment_footer_box + ' btn me-1 p-1'}>
            <IoHeartOutline aria-hidden="true" /> {comment?.likes?.length}
            {comment?.likes?.length}
          </button>
        )}
      </footer>
    </article>
  );
}

export default Comment;
