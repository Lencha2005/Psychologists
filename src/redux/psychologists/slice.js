import { createSlice } from '@reduxjs/toolkit';
import { fetchAllPsychologists } from './operations';

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
  filteredItems: [],
  filterType: 'Show all',
  page: 1,
  perPage: 3,
  isLoading: false,
  error: null,
};

const psychologistsSlice = createSlice({
  name: 'psychologists',
  initialState: INITIAL_STATE,
  reducers: {
    setFilterType(state, action) {
      state.filterType = action.payload;
      state.page = 1;
    },
    setPage(state, action) {
      state.page = action.payload;
    },
    applyFilters: state => {
      let filtered = [...state.items];

      switch (state.filterType) {
        case 'A to Z':
          filtered.sort((a, b) => a.name.localeCompare(b.name));
          break;
        case 'Z to A':
          filtered.sort((a, b) => b.name.localeCompare(a.name));
          break;
        case 'Less than 10$':
          filtered.sort((a, b) => a.price_per_hour - b.price_per_hour);
          break;
        case 'Greater than 10$':
          filtered.sort((a, b) => b.price_per_hour - a.price_per_hour);
          break;
        case 'Popular':
          filtered.sort((a, b) => b.rating - a.rating);
          break;
        case 'Not popular':
          filtered.sort((a, b) => a.rating - b.rating);
          break;
        default:
          break;
      }
      state.filteredItems = filtered;
    },
  },
  extraReducers: builder =>
    builder
      .addCase(fetchAllPsychologists.pending, handlePending)
      .addCase(fetchAllPsychologists.fulfilled, (state, action) => {
        console.log('action.payload: ', action.payload);
        state.isLoading = false;
        state.items = action.payload;
        console.log('state.items: ', state.items);
        state.filteredItems = action.payload;
        console.log('state.filteredItems: ', state.filteredItems);
        state.error = null;
      })
      .addCase(fetchAllPsychologists.rejected, handleRejected),
});

export const psychologistsReducer = psychologistsSlice.reducer;
export const { setFilterType, setPage, applyFilters } =
  psychologistsSlice.actions;
