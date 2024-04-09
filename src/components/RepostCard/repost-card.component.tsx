import { ReactElement } from 'react';
import { useFindUser } from '../../hooks/useFindUser';
import style from './repost-card.module.scss';
import { Repost } from '../../models/post.model';
import { Link, useLocation } from 'react-router-dom';

interface IRepostCard {
  target: Repost;
}

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
