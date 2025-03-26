import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectFilterType,
  selectFilteredItems,
  selectPage,
  selectPerPage,
  selectTotalPage,
} from '../../redux/psychologists/selectors';
import { fetchAllPsychologists } from '../../redux/psychologists/operations';
import PsychologistCard from '../PsychologistCard/PsychologistCard';
import css from './PsychologistsList.module.css';
import Button from '../ui/Button/Button';
import CustomSelector from '../ui/CustomSelector/CustomSelector';
import {
  applyFilters,
  setFilterType,
  setPage,
} from '../../redux/psychologists/slice';
import { selectFavorites } from '../../redux/auth/selectors';

const PsychologistsList = ({ showFavorites = false }) => {
  const dispatch = useDispatch();
  const filteredPsychologists = useSelector(selectFilteredItems);
  const favorites = useSelector(selectFavorites);
  const page = useSelector(selectPage);
  const perPage = useSelector(selectPerPage);
  const totalPage = useSelector(selectTotalPage);
  const filterType = useSelector(selectFilterType);
  const [openSelector, setOpenSelector] = useState(null);

  const options = [
    'A to Z',
    'Z to A',
    'Less than 10$',
    'Greater than 10$',
    'Popular',
    'Not popular',
    'Show all',
  ];

  const selectOptions = options.map(option => ({
    value: option,
    label: option,
  }));

  useEffect(() => {
    dispatch(fetchAllPsychologists());
  }, [dispatch]);

  useEffect(() => {
    dispatch(applyFilters());
    console.log('Filter change:', filterType);
  }, [filterType, dispatch]);

  const handleFilterChange = newFilter => {
    dispatch(setFilterType(newFilter));
  };

  const handleLoadMore = () => {
    dispatch(setPage(page + 1));
  };

  const psychologistsToShow = showFavorites
    ? filteredPsychologists.filter(psychologist =>
        favorites.includes(psychologist.name)
      )
    : filteredPsychologists;

  const visiblePsychologists = psychologistsToShow.slice(0, page * perPage);

  return (
    <div>
      <p className={css.selectorLabel}>Filter</p>
      <CustomSelector
        options={selectOptions}
        value={filterType}
        onChange={handleFilterChange}
        isOpen={openSelector}
        setOpenSelector={setOpenSelector}
        className={css.selectoror}
      />
      <ul className={css.list}>
        {visiblePsychologists.map((item, index) => {
          return (
            <li key={`${item.name}-${index}`} className={css.item}>
              <PsychologistCard psychologist={item} />
            </li>
          );
        })}
      </ul>
      {page < totalPage || visiblePsychologists.length <= 3 && (
        <Button type="button" onClick={handleLoadMore}>
          Load more
        </Button>
      )}
    </div>
  );
};

export default PsychologistsList;
