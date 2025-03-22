import { Route, Routes } from 'react-router-dom';
import { lazy, useEffect } from 'react';
import '../../firebase/firebaseConfig';
import './App.css';
import Layout from '../ui/Layout/Layout';
import { useSelector } from 'react-redux';

const HomePage = lazy(() => import('../../pages/HomePage/HomePage'));
const PsychologistsPage = lazy(() =>
  import('../../pages/PsychologistsPage/PsychologistsPage')
);
const FavoritesPage = lazy(() =>
  import('../../pages/FavoritesPage/FavoritesPage')
);
const NotFoundPage = lazy(() =>
  import('../../pages/NotFoundPage/NotFoundPage')
);

function App() {
  const theme = useSelector(state => state.theme.theme);

  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/psychologists" element={<PsychologistsPage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Layout>
  );
}

export default App;
