// import { createAsyncThunk } from "@reduxjs/toolkit";
// import { db } from "../../firebase/firebaseConfig";
// import { ref, get } from "firebase/database";

// export const fetchPsychologists = createAsyncThunk(
//   "psychologists/fetchPsychologists",
//   async (_, thunkAPI) => {
//     try {
//       const snapshot = await get(ref(db, "psychologists"));
//       if (snapshot.exists()) {
//         return Object.values(snapshot.val());
//       } else {
//         return [];
//       }
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.message);
//     }
//   }
// );

import { createAsyncThunk } from '@reduxjs/toolkit';
import { db } from "../../firebase/firebaseConfig";
import {  ref, query, orderByChild, startAt, endAt, limitToFirst, startAfter, get } from 'firebase/database';

export const fetchPsychologists = createAsyncThunk(
  'psychologists/fetchPsychologists',
  async ({ filterType = null, lastKey = null }, thunkAPI) => {
    try {
      let psychologistsQuery;
      const baseRef = ref(db, 'psychologists');

      if (!filterType) {
        psychologistsQuery = query(baseRef, orderByChild('name'), limitToFirst(3));
      } else {
        switch (filterType) {
          case 'A-Z':
            psychologistsQuery = query(baseRef, orderByChild('name'), limitToFirst(3));
            break;
          case 'Z-A': 
            psychologistsQuery = query(baseRef, orderByChild('name'), limitToFirst(32)); // Отримуємо всі, бо Firebase не сортує у зворотному порядку
            break;
          case 'Less than 10$':
            psychologistsQuery = query(baseRef, orderByChild('price_per_hour'), endAt(10), limitToFirst(3));
            break;
          case 'Greater than 10$':
            psychologistsQuery = query(baseRef, orderByChild('price_per_hour'), startAt(10), limitToFirst(3));
            break;
          case 'Popular': 
            psychologistsQuery = query(baseRef, orderByChild('rating'), limitToFirst(32)); // Отримуємо всі для сортування вручну
            break;
          case 'Not popular': 
            psychologistsQuery = query(baseRef, orderByChild('rating'), limitToFirst(3));
            break;
          default:
            return thunkAPI.rejectWithValue('Invalid filter type');
        }
      }

      // **Додаємо пагінацію**
      if (lastKey) {
        psychologistsQuery = query(baseRef, orderByChild('name'), startAfter(lastKey), limitToFirst(3));
      }

      const snapshot = await get(psychologistsQuery);
      if (!snapshot.exists()) {
        return { psychologists: [], lastKey: null };
      }

      const data = snapshot.val();
      const psychologistsArray = Object.entries(data).map(([key, value]) => ({
        id: key,
        ...value,
      }));

      // **Зворотне сортування для 'Z-A' та 'Popular'**
      if (filterType === 'Z-A') {
        psychologistsArray.reverse();
      } else if (filterType === 'Popular') {
        psychologistsArray.sort((a, b) => b.rating - a.rating);
      }

      // **Оновлюємо lastKey**
      const newLastKey = psychologistsArray.length ? psychologistsArray[psychologistsArray.length - 1].id : null;

      return { psychologists: psychologistsArray.slice(0, 3), lastKey: newLastKey };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);