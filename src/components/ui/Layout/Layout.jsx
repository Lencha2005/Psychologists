import Header from '../../Header/Header';
import Container from '../Container/Container';
import Loader from '../Loader/Loader';
import { Suspense } from 'react';

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <main>
        <Container>
          <Suspense fallback={<Loader />}>{children}</Suspense>
        </Container>
      </main>
    </>
  );
};

export default Layout;
