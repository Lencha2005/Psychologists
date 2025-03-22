import { createSlice } from '@reduxjs/toolkit';
import { fetchPsychologists } from './operations';

const INITIAL_STATE = {
  items: [],
  favorites: [],
  page: 1,
  totalPages: null,
  isLoading: false,
  error: null,
};

const psychologistSlice = createSlice({
  name: 'psychologists',
  initialState: INITIAL_STATE,
  reducers: {
    toggleFavorite(state, action) {},
  },
  extraReducers: builder => builder
  .addCase(fetchPsychologists.fulfilled, (state, action) => {
    state.isLoading = false;
    state.items = action.payload;
    state.error = null;
  })
});

export const psychologistReducer = psychologistSlice.reducer;
export const {toggleFavorite} = psychologistSlice.actions;