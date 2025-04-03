import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  resetPsychologists,
  setSortBy,
  incrementPage,
} from '../../redux/psychologists/slice';
import { fetchPsychologists } from '../../redux/psychologists/operations';
import { fetchFavorites, toggleFavorite } from '../../redux/auth/operations';
import {
  selectItems,
  selectLastKey,
  selectPsychologistIsLoading,
  selectSortBy,
  selectHasMore,
  selectPage,
} from '../../redux/psychologists/selectors';
import {
  selectFavoritesHasMore,
  selectFavoritesLastKey,
  selectFavoritesPage,
  selectFavoritesSortBy,
  selectPaginatedFavorites,
  selectUserIsLoading,
} from '../../redux/auth/selectors';
import PsychologistCard from '../PsychologistCard/PsychologistCard';
import CustomSelector from '../ui/CustomSelector/CustomSelector';
import Button from '../ui/Button/Button';
import css from './PsychologistsList.module.css';
import {
  incrementFavoritesPage,
  resetFavoritesPagination,
  setSortByFavorites,
} from '../../redux/auth/slice';

const options = [
  'A to Z',
  'Z to A',
  'Lower price',
  'Higher price',
  'Popular',
  'Not popular',
  'Show all',
];

const selectOptions = options.map(option => ({
  value: option,
  label: option,
}));

const PsychologistsList = ({ showFavorites = false }) => {
  const dispatch = useDispatch();

  const psychologists = useSelector(showFavorites ? selectPaginatedFavorites : selectItems);
  const sortBy = useSelector(showFavorites ? selectFavoritesSortBy : selectSortBy);
  const lastKey = useSelector(showFavorites ? selectFavoritesLastKey : selectLastKey);
  const page = useSelector(showFavorites ? selectFavoritesPage : selectPage);
  const hasMore = useSelector(showFavorites ? selectFavoritesHasMore : selectHasMore);
  const isLoading = useSelector(showFavorites ? selectUserIsLoading : selectPsychologistIsLoading);

  const [openSelector, setOpenSelector] = useState(null);

  const prevLengthRef = useRef(0);

  useEffect(() => {
    if (showFavorites) {
      // dispatch(resetFavoritesPagination());
      dispatch(fetchFavorites());
      // dispatch(setSortByFavorites('Show all'));
    } else {
      // dispatch(resetPsychologists());
      dispatch(fetchPsychologists({ sortBy }));
    }
  }, [dispatch, sortBy, showFavorites]);

  const handleFilterChange = newFilter => {
    if (showFavorites) {
      // dispatch(resetFavoritesPagination());
      dispatch(setSortByFavorites(newFilter));
      dispatch(fetchFavorites());
    } else {
      dispatch(setSortBy(newFilter));
      // dispatch(resetPsychologists());
      dispatch(fetchPsychologists({ sortBy: newFilter }));
    }
  };

  const handleLoadMore = () => {
    if (showFavorites) {
      dispatch(incrementFavoritesPage())
      dispatch(fetchFavorites());
    } else {
      if (sortBy === 'Show all') {
        dispatch(fetchPsychologists({ sortBy, lastKey }));
      } else {
        dispatch(incrementPage());
        dispatch(fetchPsychologists({ sortBy, page: page + 1 }));
      }
    }
  };

  useEffect(() => {
    if (
      psychologists.length > prevLengthRef.current &&
      prevLengthRef.current !== 0
    ) {
      const height = 370;
      const rows = 2;
      window.scrollBy({
        top: height * rows,
        behavior: 'smooth',
      });
    }
    prevLengthRef.current = psychologists.length;
  }, [psychologists]);

  return (
    <div>
      <p className={css.selectorLabel}>Filter</p>
      <CustomSelector
        options={selectOptions}
        value={sortBy}
        onChange={handleFilterChange}
        isOpen={openSelector}
        setOpenSelector={setOpenSelector}
        className={css.selectoror}
      />
      <ul className={css.list}>
        {psychologists.map(item => (
          <li key={item.id} className={css.item}>
            <PsychologistCard
              psychologist={item}
              onToggleFavorite={() => dispatch(toggleFavorite(item))}
            />
          </li>
        ))}
      </ul>
      {hasMore && !isLoading && (
        <Button type="button" onClick={handleLoadMore}>
          Load more
        </Button>
      )}
    </div>
  );
};

export default PsychologistsList;
