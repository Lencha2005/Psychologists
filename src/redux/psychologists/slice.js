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
  lastKey: null,
  isLoading: false,
  error: null,
};

const psychologistSlice = createSlice({
  name: 'psychologists',
  initialState: INITIAL_STATE,
  reducers: {
    toggleFavorite(state, action) {
      const psychologistId = action.payload;
      const isFavorite = state.favorites.includes(psychologistId);

      if (isFavorite) {
        state.favorites = state.favorites.filter(id => id !== psychologistId);
      } else {
        state.favorites.push(psychologistId);
      }
    },
    resetPsychologists(state) {
      state.items = [];
      state.page = 1;
      state.lastKey = null;
    },
  },
  extraReducers: builder =>
    builder
      .addCase(fetchPsychologists.pending, handlePending)
      .addCase(fetchPsychologists.fulfilled, (state, action) => {
        state.isLoading = false;
        // state.items = action.payload;
        state.items = [...state.items, ...action.payload.psychologists];
        console.log('state.items: ', state.items);
        state.lastKey = action.payload.lastKey;
        state.error = null;
      })
      .addCase(fetchPsychologists.rejected, handleRejected),
});

export const psychologistsReducer = psychologistSlice.reducer;
export const { toggleFavorite, resetPsychologists } = psychologistSlice.actions;
