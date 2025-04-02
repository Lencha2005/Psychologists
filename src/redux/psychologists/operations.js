import { createAsyncThunk } from '@reduxjs/toolkit';
import { db } from '../../firebase/firebaseConfig';
import {
  get,
  ref,
  query,
  orderByKey,
  startAfter,
  limitToFirst,
} from 'firebase/database';

export const fetchPsychologists = createAsyncThunk(
  'psychologists/fetchPsychologists',
  async (
    { sortBy = 'Show all', lastKey = null, page = 1 },
    { rejectWithValue }
  ) => {
    try {
      const limit = 3;
      const sortFieldMap = {
        'Show all': null,
        'A to Z': 'name',
        'Z to A': 'name',
        'Lower price': 'price_per_hour',
        'Higher price': 'price_per_hour',
        'Not popular': 'rating',
        Popular: 'rating',
      };

      const field = sortFieldMap[sortBy];
      const isDescending = ['Z to A', 'Higher price', 'Popular'].includes(
        sortBy
      );

      let data = [];
      let newLastKey = null;

      if (sortBy === 'Show all') {
        let baseQuery = query(ref(db, 'psychologists'), orderByKey());
        if (lastKey) {
          baseQuery = query(
            baseQuery,
            startAfter(lastKey),
            limitToFirst(limit)
          );
        } else {
          baseQuery = query(baseQuery, limitToFirst(limit));
        }

        const snapshot = await get(baseQuery);
        if (!snapshot.exists())
          return { psychologists: [], lastKey: null, hasMore: false };

        snapshot.forEach(child => {
          data.push({ id: child.key, ...child.val() });
        });

        newLastKey = data.length ? data[data.length - 1].id : null;

        return {
          psychologists: data,
          lastKey: newLastKey,
          hasMore: data.length === limit,
        };
      }

      // Fetch all and sort on front
      const snapshot = await get(ref(db, 'psychologists'));
      if (!snapshot.exists())
        return { psychologists: [], lastKey: null, hasMore: false };

      data = Object.entries(snapshot.val()).map(([id, value]) => ({
        id,
        ...value,
      }));

      if (field !== null) {
        data.sort((a, b) => {
          const aValue = a[field];
          const bValue = b[field];

          if (typeof aValue === 'string') {
            return isDescending
              ? bValue.localeCompare(aValue)
              : aValue.localeCompare(bValue);
          } else {
            return isDescending ? bValue - aValue : aValue - bValue;
          }
        });
      }

      const startIndex = (page - 1) * limit;
      const paginated = data.slice(startIndex, startIndex + limit);
      const hasMore = startIndex + limit < data.length;

      return {
        psychologists: paginated,
        hasMore,
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
