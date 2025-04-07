import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSortBy, incrementPage } from '../../redux/psychologists/slice';
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
import {
  incrementFavoritesPage,
  setSortByFavorites,
} from '../../redux/auth/slice';
import PsychologistCard from '../PsychologistCard/PsychologistCard';
import CustomSelector from '../ui/CustomSelector/CustomSelector';
import Button from '../ui/Button/Button';
import css from './PsychologistsList.module.css';

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

  const psychologists = useSelector(
    showFavorites ? selectPaginatedFavorites : selectItems
  );
  const sortBy = useSelector(
    showFavorites ? selectFavoritesSortBy : selectSortBy
  );
  const lastKey = useSelector(
    showFavorites ? selectFavoritesLastKey : selectLastKey
  );
  const page = useSelector(showFavorites ? selectFavoritesPage : selectPage);
  const hasMore = useSelector(
    showFavorites ? selectFavoritesHasMore : selectHasMore
  );
  const isLoading = useSelector(
    showFavorites ? selectUserIsLoading : selectPsychologistIsLoading
  );

  const [openSelector, setOpenSelector] = useState(null);
  const [isLoadMoreTriggered, setIsLoadMoreTriggered] = useState(false);

  const prevLengthRef = useRef(0);

  useEffect(() => {
    if (showFavorites) {
      dispatch(fetchFavorites());
    } else {
      dispatch(fetchPsychologists({ sortBy }));
    }
  }, [dispatch, sortBy, showFavorites]);

  const handleFilterChange = newFilter => {
    if (showFavorites) {
      dispatch(setSortByFavorites(newFilter));
      dispatch(fetchFavorites());
    } else {
      dispatch(setSortBy(newFilter));
      dispatch(fetchPsychologists({ sortBy: newFilter }));
    }
  };

  const handleToggleFavorite = async psychologist => {
    try {
      await dispatch(toggleFavorite(psychologist)).unwrap();
      if (showFavorites) {
        dispatch(fetchFavorites());
      }
    } catch (error) {
      console.error('❌ Failed to toggle favorite:', error);
    }
  };

  const handleLoadMore = () => {
    setIsLoadMoreTriggered(true);
    if (showFavorites) {
      dispatch(incrementFavoritesPage());
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
    if (isLoadMoreTriggered && psychologists.length > prevLengthRef.current) {
      const allCards = document.querySelectorAll('[data-psychologist-card]');
      const newCard = allCards[prevLengthRef.current];
      if (newCard) {
        newCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
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
          <li key={item.id} className={css.item} data-psychologist-card>
            <PsychologistCard
              psychologist={item}
              onToggleFavorite={() => handleToggleFavorite(item)}
            />
          </li>
        ))}
      </ul>
      {hasMore && !isLoading && (
        <Button
          type="button"
          className={css.btnLoadMore}
          onClick={handleLoadMore}
        >
          Load more
        </Button>
      )}
    </div>
  );
};

export default PsychologistsList;
