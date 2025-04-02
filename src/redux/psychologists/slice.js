import { createSlice } from '@reduxjs/toolkit';
import { fetchPsychologists } from './operations';

const initialState = {
  items: [],
  page: 1,
  hasMore: false,
  sortBy: 'Show all',
  lastKey: null,
  isLoading: false,
  error: null,
};

const psychologistsSlice = createSlice({
  name: 'psychologists',
  initialState,
  reducers: {
    resetPsychologists: state => {
      state.items = [];
      state.page = 1;
      state.hasMore = false;
      state.error = null;
      state.lastKey = null;
    },
    incrementPage: state => {
      state.page += 1;
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchPsychologists.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchPsychologists.fulfilled, (state, action) => {
        state.isLoading = false;
        state.hasMore = action.payload.hasMore;
        state.lastKey = action.payload.lastKey || null;

        const existingIds = new Set(state.items.map(p => p.id));
        const newItems = action.payload.psychologists.filter(
          p => !existingIds.has(p.id)
        );
        state.items = [...state.items, ...newItems];
      })
      .addCase(fetchPsychologists.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { resetPsychologists, incrementPage, setSortBy } =
  psychologistsSlice.actions;
export const psychologistsReducer = psychologistsSlice.reducer;
