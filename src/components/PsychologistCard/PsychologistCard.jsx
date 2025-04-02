import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectFavorites, selectIsLoggedIn } from '../../redux/auth/selectors';
import { toggleFavorite } from '../../redux/auth/operations';
import toast from 'react-hot-toast';
import PsychologistDetails from '../PsychologistDetails/PsychologistDetails';
import sprite from '../../../public/sprite.svg';
import css from './PsychologistCard.module.css';

const PsychologistCard = ({ psychologist }) => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const favorites = useSelector(selectFavorites);
  const isFavorite = favorites.some(item => item.id === psychologist.id);

  const [openReadMore, setOpenReadMore] = useState(false);

  const reviews = psychologist.reviews;

  const onOpenReadMore = () => {
    setOpenReadMore(true);
  };

  const handleFavorites = () => {
    if (isLoggedIn) {
      dispatch(toggleFavorite(psychologist));
    } else {
      toast.error('Functionality is available only to authorized users');
    }
  };

  const getIconHeartClass = () => {
    if (isFavorite) {
      return css.iconHeartActive;
    } else {
      return css.iconHeart;
    }
  };

  return (
    <div className={css.wrappperCard}>
      <div className={css.wrapperRating}>
        <p className={css.rating}>
          <svg className={css.iconStar}>
            <use href={`${sprite}#icon-star`}></use>
          </svg>
          Rating: {psychologist.rating}
        </p>
        <p>
          Price / 1 hour:
          <span className={css.green}>{psychologist.price_per_hour}$</span>
        </p>
      </div>
      <button type="button" className={css.btnHeart} onClick={handleFavorites}>
        <svg className={getIconHeartClass()}>
          <use href={`${sprite}#icon-heart`}></use>
        </svg>
      </button>

      <div className={css.wrapperDescription}>
        <div className={css.imgWrap}>
          <img
            className={css.img}
            src={psychologist.avatar_url}
            alt={psychologist.name}
          />
          <div className={css.wrappIconCircle}>
            <svg className={css.iconCircle}>
              <use href={`${sprite}#icon-circle`}></use>
            </svg>
          </div>
        </div>

        <div className={css.wrapperAbout}>
          <p className={css.profession}>Psychologist</p>
          <p className={css.name}>{psychologist.name}</p>
        </div>
        <ul className={css.list}>
          <li className={css.item}>
            Experience:{' '}
            <span className={css.span}>{psychologist.experience}</span>
          </li>
          <li className={css.item}>
            License: <span className={css.span}>{psychologist.license}</span>
          </li>
          <li className={css.item}>
            Specialization:{' '}
            <span className={css.span}>{psychologist.specialization}</span>
          </li>
          <li className={css.item}>
            Initial_consultation:{' '}
            <span className={css.span}>
              {psychologist.initial_consultation}
            </span>
          </li>
        </ul>
        <p className={css.textAbout}>{psychologist.about}</p>

        {!openReadMore ? (
          <button
            className={css.btnReadMore}
            type="button"
            onClick={onOpenReadMore}
          >
            Read more
          </button>
        ) : (
          <div className={css.details}>
            <PsychologistDetails
              reviews={reviews}
              psychologist={psychologist}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default PsychologistCard;
