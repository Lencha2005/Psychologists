import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectFavorites,
  selectPsychologists,
} from '../../redux/psychologists/selectors';
import { fetchPsychologists } from '../../redux/psychologists/operations';
import PsychologistCard from '../PsychologistCard/PsychologistCard';
import css from './PsychologistsList.module.css';

const PsychologistsList = () => {
  const dispatch = useDispatch();
  const psychologists = useSelector(selectPsychologists);
  console.log('psychologists: ', psychologists);
  const favorites = useSelector(selectFavorites);
  console.log('favorites: ', favorites);

  useEffect(() => {
    dispatch(fetchPsychologists());
  }, [dispatch]);

  useEffect(() => {
    console.log('Психологи з Redux:', psychologists);
  }, [psychologists]);

  useEffect(() => {
    console.log("Викликаємо fetchPsychologists...");
    dispatch(fetchPsychologists({ filterType: "A-Z" }));
  }, [dispatch]);

  return (
    <div>

    <ul className={css.list}>
      {Array.isArray(psychologists) &&
        psychologists.length > 0 &&
        psychologists.map((item, index) => {
          return (
            <li key={`${item.name}-${index}`} className={css.item}>
              <PsychologistCard psychologist={item} />
            </li>
          );
        })}
    </ul>
    </div>
  );
};

export default PsychologistsList;
