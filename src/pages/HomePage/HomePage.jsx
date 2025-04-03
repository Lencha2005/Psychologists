import { NavLink } from 'react-router-dom';
import sprite from '../../assets/sprite/sprite.svg';
import img1 from '../../assets/img/image.png';
import img2 from '../../assets/img/image@2x.png';
import css from './HomePage.module.css';

const HomePage = () => {
  return (
    <div className={css.wrapper}>
      <div className={css.titleWrapper}>
        <h1 className={css.title}>
          The road to the <span className={css.textPart}>depths</span> of the
          human soul
        </h1>
        <p className={css.text}>
          We help you to reveal your potential, overcome challenges and find a
          guide in your own life with the help of our experienced psychologists.
        </p>
        <div className={css.wrapperLink}>
          <NavLink className={css.link} width={235} to={'/psychologists'}>
            Get started{' '}
            <svg className={css.svgLink}>
              <use href={`${sprite}#icon-arrow`}></use>
            </svg>
          </NavLink>
        </div>
      </div>
      <img className={css.img} src={img1} srcSet={img2} alt="Psychologist" />
      <div className={css.checkWrap}>
        <div className={css.check}>
          <svg className={css.iconCheck}>
            <use href={`${sprite}#icon-check`}></use>
          </svg>
        </div>
        <div className={css.checkWrapText}>
          <p className={css.checkText}>Experienced psychologists</p>
          <p className={css.checkNumber}>15,000</p>
        </div>
      </div>
      <div className={css.iconQuestionWrap}>
        <svg className={css.iconQuestion}>
          <use href={`${sprite}#icon-question`}></use>
        </svg>
      </div>
      <div className={css.iconPeopleWrap}>
        <svg className={css.iconPeople}>
          <use href={`${sprite}#icon-people`}></use>
        </svg>
      </div>
    </div>
  );
};

export default HomePage;
