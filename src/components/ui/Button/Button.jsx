import clsx from 'clsx';
import css from './Button.module.css';

const Button = ({
  variant = 'default',
  className,
  type = 'button',
  onClick,
  children,
}) => {
  const buttonStyle = clsx(
    css.button,
    variant === 'default' && css.buttonDefault,
    variant === 'log' && css.buttonLog,
    className && className
  );
  return (
    <button type={type} className={buttonStyle} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
