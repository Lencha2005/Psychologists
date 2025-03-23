import sprite from '../../../public/sprite.svg';
import Button from '../ui/Button/Button';
import css from './PsychologistDatails.module.css'

export const PsychologistDatails = ({reviews}) => {
  return (
    <div>
      <ul>
        {reviews.map((review) => {
          return (
            <li key={review.reviewer}>
             <p className={css.avatarPlaceholder}>
            {review?.reviewer?.charAt(0).toUpperCase()}
          </p>
            <p>{review.reviewer}</p>
            <p>
          <svg className={css.iconStar}>
            <use href={`${sprite}#icon-star`}></use>
          </svg>
          {review.rating}
        </p>
        <p>{review.comment}</p>
            </li>
          )
          
        })}
      </ul>
      <Button type='button'>Make an appointment</Button>
      </div>
  )
}
