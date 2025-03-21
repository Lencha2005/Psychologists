import sprite from '../../../public/sprite.svg';
import { useSelector } from 'react-redux';
import css from './UserMenu.module.css';
import { selectUser } from '../../redux/auth/selectors';
import Button from '../ui/Button/Button';

const UserMenu = () => {
  const user = useSelector(selectUser);

  return (
    <div className={css.wrap}>
      <div className={css.svgWrapper}>
        <svg className={css.svg}>
          <use href={`${sprite}#icon-user`}></use>
        </svg>
        <p className={css.text}>{user.name}</p>
      </div>
      <Button variant="log" type="bytton" className={css.btnLogout}>
        Log out
      </Button>
    </div>
  );
};

export default UserMenu;
