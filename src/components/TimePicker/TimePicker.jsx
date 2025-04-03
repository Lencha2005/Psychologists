import { useEffect, useRef, useState } from 'react';
import sprite from '../../assets/sprite/sprite.svg';
import css from './TimePicker.module.css';

const generateTimes = () => {
  const times = [];
  const start = 9 * 60;
  const end = 19 * 60;

  for (let i = start; i <= end; i += 30) {
    const hours = Math.floor(i / 60);
    const minutes = i % 60;
    const timeValue = `${hours.toString().padStart(2, '0')} : ${minutes
      .toString()
      .padStart(2, '0')}`;
    times.push(timeValue);
  }
  return times;
};

const times = generateTimes();

const TimePicker = ({ value, onSelectTime }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleSelect = time => {
    onSelectTime(time);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = event => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className={css.timepickerContainer}>
      <div className={css.timeInput}>
        <input type="text" value={value} placeholder="00:00" readOnly />
        <button
          type="button"
          className={css.btnClock}
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg className={css.iconClock}>
            <use href={`${sprite}#icon-clock`}></use>
          </svg>
        </button>
      </div>

      {isOpen && (
        <div className={css.dropdown} ref={dropdownRef}>
          <p className={css.dropdownTitle}>Meeting time</p>
          <ul className={css.dropdownList}>
            {times.map(time => (
              <li
                key={time}
                className={css.dropdownItem}
                onClick={() => handleSelect(time)}
              >
                {time}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default TimePicker;
