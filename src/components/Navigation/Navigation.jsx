// import { useSelector } from 'react-redux';
// import { selectIsLoggedIn } from '../../redux/auth/selectors';
// import { NavLink } from 'react-router-dom'

// import clsx from 'clsx';
// import css from './Navigation.module.css'

// const buildCssClasses = ({ isActive }) =>
//     clsx(css.link, isActive && css.active);


// const Navigation = ({onClose}) => {
//     const isLoggedIn = useSelector(selectIsLoggedIn);
//   return (
//     <nav className={css.nav}>
//         <NavLink className={buildCssClasses} to='/' onClick={onClose}>Home</NavLink>
//         <NavLink className={buildCssClasses} to='/psychologists' onClick={onClose}>Psychologists</NavLink>
//         {isLoggedIn && <NavLink className={buildCssClasses} to='/favorites' onClick={onClose}>Favorites</NavLink>}
//     </nav>
//   )
// }

// export default Navigation

import { useState } from "react";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../redux/auth/selectors";
import { NavLink } from "react-router-dom";
import clsx from "clsx";

import css from "./Navigation.module.css";

const buildCssClasses = ({ isActive }) =>
  clsx(css.link, isActive && css.active);

const Navigation = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const [isOpen, setIsOpen] = useState(false); // стан відкриття списку

  return (
    <nav className={css.nav}>
      {/* Кнопка для відкриття меню на планшеті */}
      <button
        className={css.menuButton}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        Меню
      </button>

      {/* Список навігації */}
      <ul className={clsx(css.menuList, isOpen && css.open)}>
        <li>
          <NavLink className={buildCssClasses} to="/" onClick={() => setIsOpen(false)} >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink className={buildCssClasses} to="/psychologists" onClick={() => setIsOpen(false)}>
            Psychologists
          </NavLink>
        </li>
        {isLoggedIn && (
          <li>
            <NavLink className={buildCssClasses} to="/favorites" onClick={() => setIsOpen(false)}>
              Favorites
            </NavLink>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navigation;