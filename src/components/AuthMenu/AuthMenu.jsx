import { useState } from 'react';
import Button from '../ui/Button/Button';
import LoginForm from '../LoginForm/LoginForm';
import RegistrationForm from '../RegistrationForm/RegistrationForm';
import css from './AuthMenu.module.css';

const AuthMenu = () => {
  const [isOpenSingUp, setIsOpenSingUp] = useState(false);
  const [isOpenLogIn, setIsOpenLogIn] = useState(false);

  return (
    <div className={css.wrap}>
      <Button
        variant="log"
        className={css.btnLogin}
        onClick={() => setIsOpenLogIn(true)}
      >
        Log In
      </Button>
      <Button
        variant="default"
        className={css.btnRegistration}
        onClick={() => setIsOpenSingUp(true)}
      >
        Registration
      </Button>
      {isOpenLogIn && (
        <LoginForm isOpen={isOpenLogIn} onClose={() => setIsOpenLogIn(false)} />
      )}
      {isOpenSingUp && (
        <RegistrationForm
          isOpen={isOpenSingUp}
          onClose={() => setIsOpenSingUp(false)}
        />
      )}
    </div>
  );
};

export default AuthMenu;
