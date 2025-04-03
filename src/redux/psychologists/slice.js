import { createSlice } from '@reduxjs/toolkit';
import { fetchPsychologists } from './operations';
import { applySorting } from '../../utils/applySorting';
import { paginate } from '../../utils/paginate';

const INITIAL_STATE = {
  items: [],
  lastKey: null,
  hasMore: false,
  sortBy: 'Show all',
  page: 1,
  isLoading: false,
  error: null,
};

const psychologistsSlice = createSlice({
  name: 'psychologists',
  initialState: INITIAL_STATE,
  reducers: {
    resetPsychologists: state => {
      state.items = [];
      state.lastKey = null;
      state.hasMore = false;
      state.page = 1;
      state.error = null;
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
      state.page = 1;
    },
    incrementPage: state => {
      state.page += 1;
    },
  },
  extraReducers: builder =>
    builder
      .addCase(fetchPsychologists.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchPsychologists.fulfilled, (state, action) => {
        state.isLoading = false;
        state.hasMore = action.payload.hasMore;
        state.lastKey = action.payload.lastKey || null;

        let newItems = action.payload.psychologists;

        if (state.sortBy === 'Show all') {
          // бекенд пагінація
          const existingIds = new Set(state.items.map(item => item.id));
          const filtered = newItems.filter(item => !existingIds.has(item.id));
          state.items = [...state.items, ...filtered];
        } else {
          // фронтенд сортування + пагінація
          const sorted = applySorting(newItems, state.sortBy);
          const { paginated, hasMore, lastKey } = paginate(sorted, state.page);

          state.hasMore = hasMore;
          state.lastKey = lastKey;

          if (state.page === 1) {
            state.items = paginated;
          } else {
            const existingIds = new Set(state.items.map(item => item.id));
            const filtered = paginated.filter(
              item => !existingIds.has(item.id)
            );
            state.items = [...state.items, ...filtered];
          }
        }
      })
      .addCase(fetchPsychologists.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      }),
});

export const { resetPsychologists, setSortBy, incrementPage } =
  psychologistsSlice.actions;
export const psychologistsReducer = psychologistsSlice.reducer;
