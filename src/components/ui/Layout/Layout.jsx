import { useLocation } from 'react-router-dom';
import Header from '../../Header/Header';
import Container from '../Container/Container';
import Loader from '../Loader/Loader';
import { Suspense } from 'react';

import css from './Layout.module.css';

const Layout = ({ children }) => {
  const location = useLocation();
  const isHome = location.pathname === '/';
  return (
    <>
      <Header />
      <main className={isHome ? css.background : ''}>
        <Container>
          <Suspense fallback={<Loader />}>{children}</Suspense>
        </Container>
      </main>
    </>
  );
};

export default Layout;
