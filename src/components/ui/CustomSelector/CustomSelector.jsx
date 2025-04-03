import { useEffect, useRef } from 'react';
import sprite from '../../../assets/sprite/sprite.svg';
import css from './CustomSelector.module.css';

const CustomSelector = ({
  value,
  options,
  onChange,
  isOpen,
  setOpenSelector,
}) => {

  const selectorRef = useRef(null);

  const handleSelect = option => {
    onChange(option.value);
    setOpenSelector(false);
  };

  const handleToggle = () => {
    setOpenSelector(prev => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (selectorRef.current && !selectorRef.current.contains(e.target)) {
        setOpenSelector(null);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [setOpenSelector]);

  return (
    <div className={css.selectorWrapper} ref={selectorRef}>
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
