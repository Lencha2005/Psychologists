import { Outlet, useLocation } from 'react-router-dom';
import { Suspense } from 'react';
import Header from '../../Header/Header';
import Container from '../Container/Container';
import Loader from '../Loader/Loader';
import css from './Layout.module.css';

const Layout = ({ children }) => {
  const location = useLocation();

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
    </div>
  );
};

export default Layout;
