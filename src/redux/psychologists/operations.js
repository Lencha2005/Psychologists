import { createAsyncThunk } from '@reduxjs/toolkit';
import { db } from '../../firebase/firebaseConfig';
import { ref, get } from 'firebase/database';

export const fetchAllPsychologists = createAsyncThunk(
  'psychologists/fetchAll',
  async (_, thunkAPI) => {
    try {
      const baseRef = ref(db, 'psychologists');
      const snapshot = await get(baseRef);

      if (!snapshot.exists()) {
        return [];
      }

      return Object.entries(snapshot.val()).map(([key, value]) => ({
        ...value,
        key,
      }));
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
