import { Route, Routes } from 'react-router-dom';
import { lazy, useEffect } from 'react';
import '../../firebase/firebaseConfig';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectIsRefreshing,
  selectUserIsLoading,
} from '../../redux/auth/selectors';
import { selectPsychologistIsLoading } from '../../redux/psychologists/selectors';
import Layout from '../ui/Layout/Layout';
import Notification from '../ui/Notification/Notification';
import Loader from '../ui/Loader/Loader';
import { currentUser } from '../../redux/auth/operations';

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
  const dispatch = useDispatch();
  const isRefreshing = useSelector(selectIsRefreshing);
  const isLoadingUser = useSelector(selectUserIsLoading);
  const isLoadingPsychologist = useSelector(selectPsychologistIsLoading);
  const theme = useSelector(state => state.theme.theme);

  useEffect(() => {
    dispatch(currentUser());
  }, [dispatch]);

  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
  }, [theme]);

  if (isRefreshing) {
    return <Loader />;
  }

  return (
    <>
      <Notification />
    <Layout>
      {(isLoadingUser || isLoadingPsychologist) && <Loader />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/psychologists" element={<PsychologistsPage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Layout>
    </>
  );
}

export default App;
