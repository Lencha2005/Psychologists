import { useDispatch, useSelector } from 'react-redux';
import { openLoginModal, openRegistrationModal } from '../../redux/modal/slice';
import {
  selectIsLoginModalOpen,
  selectIsRegistrationModalOpen,
} from '../../redux/modal/selectors';
import Button from '../ui/Button/Button';
import css from './AuthMenu.module.css';

const AuthMenu = ({ onClose }) => {
  const dispatch = useDispatch();
  const isOpenSingUp = useSelector(selectIsRegistrationModalOpen);
  const isOpenLogIn = useSelector(selectIsLoginModalOpen);

  const openSingUp = () => {
    if (!isOpenSingUp) {
      dispatch(openRegistrationModal());
      onClose();
    }
  };

  const openLogIn = () => {
    if (!isOpenLogIn) dispatch(openLoginModal());
    onClose();
  };

  return (
    <div className={css.wrap}>
      <Button variant="log" className={css.btnLogin} onClick={openLogIn}>
        Log In
      </Button>
      <Button
        variant="default"
        className={css.btnRegistration}
        onClick={openSingUp}
      >
        Registration
      </Button>
    </div>
  );
};

export default AuthMenu;
