import sprite from '../../../public/sprite.svg';
import img1 from '../../img/image.png';
import img2 from '../../img/image@2x.png';
import Button from '../../components/ui/Button/Button';
import css from './HomePage.module.css';
import Section from '../../components/ui/Section/Section';

const HomePage = () => {
  return (
    // <Section className={css.section}>
    <div className={css.wrapper}>
      <div className={css.titleWrapper}>
        <h1 className={css.title}>
          The road to the <span className={css.greenText}>depths</span> of
          the human soul
        </h1>
        <p className={css.text}>
          We help you to reveal your potential, overcome challenges and find a
          guide in your own life with the help of our experienced psychologists.
        </p>
        <Button type='button' className={css.btn} variant='default' width={235}>
          Get started{' '}
          <svg className={css.btnSvg}>
            <use href={`${sprite}#icon-arrow`}></use>
          </svg>
        </Button>
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
    // </Section>
  );
};

export default HomePage;
