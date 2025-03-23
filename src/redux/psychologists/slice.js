import { createSlice } from '@reduxjs/toolkit';
import { fetchPsychologists } from './operations';

const handlePending = state => {
  state.isLoading = true;
  state.error = null;
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

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
  extraReducers: builder =>
    builder
      .addCase(fetchPsychologists.pending, handlePending)
      .addCase(fetchPsychologists.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
        state.error = null;
      })
      .addCase(fetchPsychologists.rejected, handleRejected),
});

export const psychologistsReducer = psychologistSlice.reducer;
export const { toggleFavorite } = psychologistSlice.actions;
