import { useState } from 'react';
import sprite from '../../../public/sprite.svg';
import { PsychologistDatails } from '../PsychologistDatails/PsychologistDatails';
import css from './PsychologistCard.module.css';

const PsychologistCard = ({ psychologist }) => {
  const [open, setOpen] = useState(false);
  const reviews = psychologist.reviews;

  const onOpen = () => {
    setOpen(true);
  };

  return (
    <div className={css.wrappper}>
      <div className={css.wrapperRating}>
        <p className={css.rating}>
          <svg className={css.iconStar}>
            <use href={`${sprite}#icon-star`}></use>
          </svg>
          Rating: {psychologist.rating}
        </p>
        <p>
          Price / 1 hour:{' '}
          <span className={css.green}>{psychologist.price_per_hour}$</span>
        </p>
      </div>
      <svg className={css.iconHeart}>
        <use href={`${sprite}#icon-heart`}></use>
      </svg>
      <div className={css.imgWrap}>
      <img
        className={css.img}
        src={psychologist.avatar_url}
        alt={psychologist.name}
      />
      <div className={css.wrappIconCircle}><svg className={css.iconCircle}><use href={`${sprite}#icon-circle`}></use></svg></div>
      </div>
      
      <div className={css.wrapperDescription}>
        <p className={css.profession}>Psychologist</p>
        <p className={css.name}>{psychologist.name}</p>
        <div className={css.wrapperSpan}>
          <span className={css.span}>
            Experience: {psychologist.experience}
          </span>
          <span className={css.span}>License: {psychologist.license}</span>
          <span className={css.span}>
            Specialization: {psychologist.specialization}
          </span>
          <span className={css.span}>
            Initial_consultation: {psychologist.initial_consultation}
          </span>
        </div>
        <p className={css.about}>{psychologist.about}</p>
      </div>
      {!open && (
        <button className={css.btnReadMore} type="button" onClick={onOpen}>
          Read more
        </button>
      )}
      {open && <PsychologistDatails reviews={reviews} />}
    </div>
  );
};

export default PsychologistCard;
