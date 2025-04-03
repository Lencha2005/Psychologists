import { useDispatch } from 'react-redux';
import { openModal } from '../../redux/modal/slice';
import Button from '../ui/Button/Button';
import css from './AuthMenu.module.css';

const AuthMenu = ({ onClose }) => {
  const dispatch = useDispatch();

  const onLogoInClick = () => {
    dispatch(openModal({ type: 'login' }));
    onClose();
  };

  const onSignUpClick = () => {
    dispatch(openModal({ type: 'register' }));
    onClose();
  };

  return (
    <div className={css.wrap}>
      <Button
        variant="log"
        className={css.btnLogin}
        onClick={() => {
          dispatch(onLogoInClick);
        }}
      >
        Log In
      </Button>
      <Button
        variant="default"
        className={css.btnRegistration}
        onClick={onSignUpClick}
      >
        Registration
      </Button>
    </div>
  );
};

export default AuthMenu;
