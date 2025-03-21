import css from './Logo.module.css';

const Logo = () => {
  return (
    <p className={css.logo}>
      <span className={css.greenPart}>psychologists.</span>service
    </p>
  );
};

export default Logo;
