import clsx from 'clsx';
import css from './Button.module.css';

const Button = ({
  variant = 'default',
  width = '100%',
  className,
  type = 'button',
  onClick,
  children,
}) => {
  const buttonStyle = clsx(
    css.button,
    variant === 'default' && css.buttonGreen,
    variant === 'log' && css.buttonLog,
    // variant === "green" && css.buttonGreen,
    // variant === "blue" && css.buttonBlue,
    // variant === "orange" && css.buttonOrange,
    className && className
  );
  return (
    <button
      type={type}
      className={buttonStyle}
      style={{ width }}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
