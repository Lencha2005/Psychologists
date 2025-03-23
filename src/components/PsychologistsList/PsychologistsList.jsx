import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectPsychologists } from '../../redux/psychologists/selectors';
import { fetchPsychologists } from '../../redux/psychologists/operations';

import css from './PsychologistsList.module.css';
import PsychologistCard from '../PsychologistCard/PsychologistCard';

const PsychologistsList = () => {
  const dispatch = useDispatch();
  const psychologists = useSelector(selectPsychologists);

  
  useEffect(() => {
    dispatch(fetchPsychologists());
  }, [dispatch]);
  
  useEffect(() => {
    console.log('Психологи з Redux:', psychologists);
  }, [psychologists]);
  // console.log('psychologists: ', psychologists);

  // const key = psychologists.map(item => {
  //   const license = Number.parseInt(item.license.match(/\d+/));
  //   console.log('license: ', license);
    
  // })



  return <div className={css.wrapper}> 
{Array.isArray(psychologists) && psychologists.length > 0 && (
  psychologists.map(item => {
    return (
      <li key ={item.name}>
        <PsychologistCard psychologist ={item}/>
      </li>
    )
  })
)}
  </div>;
};

export default PsychologistsList;
