import sprite from '../../../public/sprite.svg';
import Button from '../ui/Button/Button';
import css from './PsychologistDetails.module.css';

const PsychologistDetails = ({ reviews }) => {
  return (
    <>
      <ul className={css.list}>
        {reviews.map(review => {
          return (
            <li key={review.reviewer} className={css.item}>
              <p className={css.avatarPlaceholder}>
                {review?.reviewer?.charAt(0).toUpperCase()}
              </p>
              <div className={css.wrapperRewiewer}>
                <p className={css.reviewer}>{review.reviewer}</p>
                <p className={css.rating}>
                  <svg className={css.iconStar}>
                    <use href={`${sprite}#icon-star`}></use>
                  </svg>
                  {review.rating}
                </p>
              </div>

              <p className={css.comment}>{review.comment}</p>
            </li>
          );
        })}
      </ul>
      <Button type="button" variant="default" className={css.btn}>
        Make an appointment
      </Button>
    </>
  );
};

export default PsychologistDetails;
