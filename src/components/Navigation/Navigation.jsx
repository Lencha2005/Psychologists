import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../../redux/auth/selectors';
import { NavLink, useLocation } from 'react-router-dom';

import clsx from 'clsx';
import css from './Navigation.module.css';

const buildCssClasses = ({ isActive }) =>
  clsx(css.link, isActive && css.active);

const Navigation = ({ onClose }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [isTablet, setIsTablet] = useState(
    window.innerWidth >= 768 && window.innerWidth < 1200
  );

  useEffect(() => {
    const handleResize = () => {
      setIsTablet(window.innerWidth >= 768 && window.innerWidth < 1200);
      if (window.innerWidth >= 1200) {
        setIsOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const onCloseModal = () => {
    setIsOpen(false);
    onClose();
  };

  const getPageName = () => {
    if (location.pathname === '/') return 'Home';
    if (location.pathname === '/psychologists') return 'Psychologists';
    if (location.pathname === '/favorites') return 'Favorites';
    return 'Menu';
  };

  return (
    <nav className={css.nav}>
      {isTablet && (
        <button
          className={css.menuButton}
          onClick={() => setIsOpen(prev => !prev)}
        >
          {getPageName()}
        </button>
      )}

      {(isTablet && isOpen) || !isTablet ? (
        <ul className={clsx(css.menuList, isOpen && css.open)}>
          <li>
            <NavLink className={buildCssClasses} to="/" onClick={onCloseModal}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              className={buildCssClasses}
              to="/psychologists"
              onClick={onCloseModal}
            >
              Psychologists
            </NavLink>
          </li>
          {isLoggedIn && (
            <li>
              <NavLink
                className={buildCssClasses}
                to="/favorites"
                onClick={onCloseModal}
              >
                Favorites
              </NavLink>
            </li>
          )}
        </ul>
      ) : null}
    </nav>
  );
};

export default Navigation;
