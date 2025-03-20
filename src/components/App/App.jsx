import { Route, Routes } from 'react-router-dom';
import { lazy } from 'react';
import './App.css';

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
  <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/psychologists" element={<PsychologistsPage />} />
    <Route path="/favorites" element={<FavoritesPage />} />
    <Route path="*" element={<NotFoundPage />} />
  </Routes>;
}

export default App;
