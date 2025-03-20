import { createSlice } from '@reduxjs/toolkit';

const INITIAL_STATE = {
  items: [],
  favorites: [],
  page: 1,
  totalPages: null,
  isLoading: false,
  error: null,
};

const psychologistSlice = createSlice({
  name: 'psychologist',
  initialState: INITIAL_STATE,
  reducers: {
    toggleFavorite(state, action) {},
  },
  extraReducers: builder => builder,
});

export const psychologistReduser = psychologistSlice.reducer;
export const {toggleFavorite} = psychologistSlice.actions;