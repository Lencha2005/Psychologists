// import { useSelector } from 'react-redux';
// import Logo from '../Logo/Logo';
// import Navigation from '../Navigation/Navigation';

// import { selectIsLoggedIn } from '../../redux/auth/selectors';
// import UserMenu from '../UserMenu/UserMenu';
// import AuthMenu from '../AuthMenu/AuthMenu';
// import Container from '../ui/Container/Container';

// import css from './Header.module.css';
// import { useState } from 'react';

// const Header = () => {
//   const isLoggedIn = useSelector(selectIsLoggedIn);

//   return (
//     <header className={css.header}>
//       <div className={css.wrapper}>
//       <Logo />
//       <Navigation />
//       {isLoggedIn ? <UserMenu /> : <AuthMenu />}
//       </div>
//     </header>
//   );
// };

// export default Header;

import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import Logo from '../Logo/Logo';
import Navigation from '../Navigation/Navigation';
import { selectIsLoggedIn } from '../../redux/auth/selectors';
import UserMenu from '../UserMenu/UserMenu';
import AuthMenu from '../AuthMenu/AuthMenu';
import sprite from '../../../public/sprite.svg';

import css from './Header.module.css';

const Header = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setMenuOpen(false); // Закриваємо меню при розширенні екрану
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <header className={css.header}>
      <Logo />

      {
        /* Бургер-кнопка для відкриття меню */
        isMobile && (
          <button className={css.btn} onClick={() => setMenuOpen(!menuOpen)} >
            <svg className={css.iconBtn}>
            <use href={`${sprite}#${menuOpen ? "icon-close" : "icon-burger"}`} />
          </svg>
          </button>
        )
      }

      {/* Мобільне меню */}
      <div
        className={`${css.menu} ${menuOpen ? css.open : ''}`} >
        <Navigation onClose={() => setMenuOpen(false)}/>
        {isLoggedIn ? <UserMenu /> : <AuthMenu />}
      </div>
    </header>
  );
};

export default Header;
