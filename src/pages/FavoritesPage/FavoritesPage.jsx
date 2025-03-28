import { useSelector } from 'react-redux';
import { selectFavorites } from '../../redux/auth/selectors';
import PsychologistsList from '../../components/PsychologistsList/PsychologistsList';
import css from './FavoritesPage.module.css';

const FavoritesPage = () => {
  const favorites = useSelector(selectFavorites);
  return (
    <div className={css.page}>
      {favorites.length > 0 ? (
        <PsychologistsList showFavorites={true} />
      ) : (
        <p className={css.text}>You do not have a favorites list yet</p>
      )}
    </div>
  );
};

export default FavoritesPage;
