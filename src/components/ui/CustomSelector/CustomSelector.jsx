import sprite from '../../../../public/sprite.svg';
import css from './CustomSelector.module.css';

const CustomSelector = ({
  value,
  options,
  onChange,
  isOpen,
  setOpenSelector,
}) => {
  const handleSelect = option => {
    onChange(option.value);
    setOpenSelector(false);
  };

  const handleToggle = () => {
    setOpenSelector(prev => !prev);
  };

  return (
    <div className={css.selectorWrapper}>
      <div className={css.selector} onClick={handleToggle}>
        <span className={css.placeholder}>{value}</span>
        <svg className={css.icon}>
          <use href={`${sprite}#icon-chevron`}></use>
        </svg>
      </div>
      {isOpen && (
        <ul className={css.dropdown}>
          {options.map(option => (
            <li key={option.value} onClick={() => handleSelect(option)}>
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CustomSelector;
