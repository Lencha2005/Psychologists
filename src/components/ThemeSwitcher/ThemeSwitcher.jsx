import { useSelector, useDispatch } from 'react-redux';
import { setTheme } from '../../redux/theme/slice';
import sprite from '../../../public/sprite.svg';
import css from './ThemeSwitcher.module.css';

const ThemeSwitcher = () => {
  const dispatch = useDispatch();

  const handleThemeChange = newTheme => {
    dispatch(setTheme(newTheme));
  };

  return (
    <div className={css.wrapper}>
      {/* <p>Theme</p> */}
      <div className={css.btnWrap}>
        <button className={css.btn} onClick={() => handleThemeChange('green')}>
          <svg className={css.green}>
            <use href={`${sprite}#icon-circle`}></use>
          </svg>
        </button>
        <button className={css.btn} onClick={() => handleThemeChange('blue')}>
          <svg className={css.blue}>
            <use href={`${sprite}#icon-circle`}></use>
          </svg>
        </button>
        <button className={css.btn} onClick={() => handleThemeChange('orange')}>
          <svg className={css.orange}>
            <use href={`${sprite}#icon-circle`}></use>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ThemeSwitcher;
