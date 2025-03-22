import Button from '../ui/Button/Button';
import css from './AuthMenu.module.css';

const AuthMenu = () => {
  return (
    <div className={css.wrap}>
      <Button variant="log" className={css.btnLogin} onClick={() => {}}>
        Log In
      </Button>
      <Button
        variant="default"
        className={css.btnRegistration}
        onClick={() => {}}
      >
        Registration
      </Button>
    </div>
  );
};

export default AuthMenu;
