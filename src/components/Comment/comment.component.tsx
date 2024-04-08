import { ReactElement } from 'react';

import style from './comment.module.scss';
import { Post } from '../../models/post.model';
import { useFindUser } from '../../hooks/useFindUser';
import { formatDistance } from 'date-fns';
import { useSelector } from 'react-redux';
import { selectLoggedUser } from '../../store/user/user.slice';
import { IoHeartOutline } from 'react-icons/io5';

interface IComment {
  comment: Post;
}

function Comment({ comment }: IComment): ReactElement {
  const loggedUser = useSelector(selectLoggedUser);
  const commentUser = useFindUser(comment.user);
  const isAuthor = comment.user === loggedUser?.id;

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
          <h3 className={style.comment_header__title + ' text-dark'}>
            {commentUser?.name}
          </h3>
          <small className={style.comment_header__timestamp + ' text-muted'}>
            {formatDistance(new Date(comment?.createdAt), new Date(), {
              addSuffix: true,
            })}
          </small>
        </div>
      </header>

      <div className={style.comment_body + ' pt-3 pb-2'}>
        <p className="text-muted">{comment?.content}</p>
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
