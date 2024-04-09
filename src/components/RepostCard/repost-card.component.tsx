import { ReactElement } from 'react';
import { Link, useLocation } from 'react-router-dom';

import style from './repost-card.module.scss';
// imports
import { Repost } from '../../models/post.model';
import { useFindUser } from '../../hooks/useFindUser';

interface IRepostCard {
  target: Repost;
}

/**
 * Renders the Repost card using the provided object.
 * @param target - The target post object.
 */
function RepostCard({ target }: IRepostCard): ReactElement {
  const location = useLocation();
  const repost = useFindUser(target.userId);

  return (
    <article className={style.repost}>
      <Link
        className={style.repost__link + ' d-flex align-items-center gap-2'}
        to={`/user/${repost?.id}`}
        state={{ background: location }}>
        <img
          src={repost?.avatar}
          className={style.repost__image}
          alt="user photo"
          aria-hidden="true"
        />
        <small className={style.repost__name}>{repost?.name} - Repost</small>
      </Link>
      <p className="text-light mt-3 mb-2">{target.content}</p>
    </article>
  );
}
export default RepostCard;
