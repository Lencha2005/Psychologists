import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../../redux/auth/selectors';
import Logo from '../Logo/Logo';
import Navigation from '../Navigation/Navigation';
import ThemeSwitcher from '../ThemeSwitcher/ThemeSwitcher';
import UserMenu from '../UserMenu/UserMenu';
import AuthMenu from '../AuthMenu/AuthMenu';
import sprite from '../../assets/sprite/sprite.svg';
import css from './Header.module.css';

const Header = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setMenuOpen(false);
      }
    };

    checkMobile();

    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const handleClickOutside = e => {
      if (menuOpen && menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [menuOpen]);

  return (
    <header className={css.header}>
      <div className={css.wrapper}>
        <Logo />
        <ThemeSwitcher />

        {isMobile && (
          <button className={css.btn} onClick={() => setMenuOpen(!menuOpen)}>
            <svg className={css.iconBtn}>
              <use
                href={`${sprite}#${menuOpen ? 'icon-close' : 'icon-burger'}`}
              />
            </svg>
          </button>
        )}

        <div
          ref={menuRef}
          className={`${css.menu} ${menuOpen ? css.open : ''}`}
        >
          <Navigation onClose={() => setMenuOpen(false)} />
          {isLoggedIn ? (
            <UserMenu onClose={() => setMenuOpen(false)} />
          ) : (
            <AuthMenu onClose={() => setMenuOpen(false)} />
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
