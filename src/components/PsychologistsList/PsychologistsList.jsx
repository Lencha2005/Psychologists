

import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  resetPsychologists,
  setSortBy,
  incrementPage
} from '../../redux/psychologists/slice';
import { fetchPsychologists } from '../../redux/psychologists/operations';
import {
  // fetchFavorites,
  toggleFavorite,
} from '../../redux/auth/operations';
import {
  selectItems,
  selectLastKey,
  selectPsychologistIsLoading,
  selectSortBy,
  selectHasMore,
  selectPage,
} from '../../redux/psychologists/selectors';
import { selectFavorites } from '../../redux/auth/selectors';
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
  const psychologists = useSelector(selectItems);
  // const filteredItems = useSelector(selectFilteredItems);
  const favorites = useSelector(selectFavorites);
  useEffect(() => {
    console.log('✅ favorites updated:', favorites);
  }, [favorites]);
  const sortBy = useSelector(selectSortBy);
  const lastKey = useSelector(selectLastKey);
  const page = useSelector(selectPage);
  const hasMore = useSelector(selectHasMore);
  const isLoading = useSelector(selectPsychologistIsLoading);
  const [openSelector, setOpenSelector] = useState(null);

  const prevLengthRef = useRef(0);

  useEffect(() => {
    dispatch(resetPsychologists());
    dispatch(fetchPsychologists({ sortBy }));
  }, [dispatch, sortBy]);

  const handleFilterChange = (newFilter) => {
    dispatch(setSortBy(newFilter))
    dispatch(resetPsychologists());
    dispatch(fetchPsychologists({ sortBy: newFilter }));
  };

  const handleLoadMore = () => {
    if (sortBy === 'Show all') {
      dispatch(fetchPsychologists({ sortBy, lastKey}));
    } else {
      dispatch(incrementPage());
      dispatch(fetchPsychologists({ sortBy, page: page + 1 }));
    }
  };


  const isFavorite = id => favorites.some(item => item.id === id);

  const visiblePsychologists = showFavorites ? favorites : psychologists



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

  console.count('🔄 PsychologistsList rendered');
  return (
    <div>
      {!showFavorites && (
        <>
          <p className={css.selectorLabel}>Filter</p>
          <CustomSelector
            options={selectOptions}
            value={sortBy}
            onChange={handleFilterChange}
            isOpen={openSelector}
            setOpenSelector={setOpenSelector}
            className={css.selectoror}
          />
        </>
      )}
      <ul className={css.list}>
        {visiblePsychologists.map((item) => (
          <li key={item.id} className={css.item}>
            <PsychologistCard psychologist={item} onToggleFavorite={() => dispatch(toggleFavorite(item))}
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
