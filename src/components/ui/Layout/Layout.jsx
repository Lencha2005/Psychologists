import { Outlet, useLocation } from 'react-router-dom';
import { Suspense } from 'react';
import { useSelector } from 'react-redux';
import {
  selectIsLoginModalOpen,
  selectIsRegistrationModalOpen,
} from '../../../redux/modal/selectors';
import Header from '../../Header/Header';
import Container from '../Container/Container';
import Loader from '../Loader/Loader';
import RegistrationForm from '../../RegistrationForm/RegistrationForm';
import LoginForm from '../../LoginForm/LoginForm';
import css from './Layout.module.css';

const Layout = ({ children }) => {
  const location = useLocation();
  const isRegistrationModalOpen = useSelector(selectIsRegistrationModalOpen);
  const isLoginModalOpen = useSelector(selectIsLoginModalOpen);

  const getBackgroundClass = () => {
    if (
      location.pathname === '/psychologists' ||
      location.pathname === '/favorites'
    )
      return css.psychologistsBg;
    return css.homeBg;
  };

  return (
    <div className={`${css.layoutWrapper} ${getBackgroundClass()}`}>
      <Header />
      <main>
        <Container>
          <Suspense fallback={<Loader />}>{children}</Suspense>
          <Outlet />
        </Container>
      </main>
      {isRegistrationModalOpen && <RegistrationForm />}
      {isLoginModalOpen && <LoginForm />}
    </div>
  );
};

export default Layout;
