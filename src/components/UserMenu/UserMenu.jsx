import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../../redux/auth/selectors';
import { logoutUser } from '../../redux/auth/operations';
import Button from '../ui/Button/Button';
import sprite from '../../../public/sprite.svg';
import css from './UserMenu.module.css';

const UserMenu = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const onLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <div className={css.wrap}>
      <div className={css.userWrapp}>
        <div className={css.svgWrapp}>
          <svg className={css.svg}>
            <use href={`${sprite}#icon-user`}></use>
          </svg>
        </div>
        <p className={css.text}>{user.name}</p>
      </div>
      <Button
        variant="log"
        type="bytton"
        className={css.btnLogout}
        onClick={onLogout}
      >
        Log out
      </Button>
    </div>
  );
};

export default UserMenu;
