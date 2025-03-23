import { Outlet, useLocation } from 'react-router-dom';
import Header from '../../Header/Header';
import Container from '../Container/Container';
import Loader from '../Loader/Loader';
import { Suspense } from 'react';

import css from './Layout.module.css';
import { useSelector } from 'react-redux';
import {
  selectIsLoginModalOpen,
  selectIsRegistrationModalOpen,
} from '../../../redux/modal/selectors';
import RegistrationForm from '../../RegistrationForm/RegistrationForm';
import LoginForm from '../../LoginForm/LoginForm';

const Layout = ({ children }) => {
  const location = useLocation();
  const isRegistrationModalOpen = useSelector(selectIsRegistrationModalOpen);
  const isLoginModalOpen = useSelector(selectIsLoginModalOpen);

  const isHome = location.pathname === '/';
  return (
    <>
      <Header />
      <main className={isHome ? css.background : ''}>
        <Container>
          <Suspense fallback={<Loader />}>{children}</Suspense>
          <Outlet />
        </Container>
      </main>
      {isRegistrationModalOpen && <RegistrationForm />}
      {isLoginModalOpen && <LoginForm />}
    </>
  );
};

export default Layout;
