import { createSlice } from '@reduxjs/toolkit';
import {
  currentUser,
  fetchFavorites,
  loginUser,
  logoutUser,
  registerUser,
  toggleFavorite,
} from './operations';
import { paginate } from '../../utils/paginate';
import { applySorting } from '../../utils/applySorting';

const handlePending = state => {
  state.isLoading = true;
  state.error = null;
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

const INITIAL_STATE = {
  user: {
    name: null,
    email: null,
    uid: null,
    token: null,
  },
  favorites: [],
  paginatedFavorites: [],
  lastKey: null,
  hasMore: false,
  sortBy: 'Show all',
  page: 1,
  isLoggedIn: false,
  isRefreshing: false,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState: INITIAL_STATE,
  reducers: {
    setSortByFavorites: (state, action) => {
      state.sortBy = action.payload;
      state.page = 1;
    },
    incrementFavoritesPage: state => {
      state.page += 1;
    },
    resetFavoritesPagination: state => {
      state.lastKey = null;
      state.hasMore = false;
      state.page = 1;
      state.error = null;
    },
  },
  extraReducers: builder =>
    builder
      .addCase(registerUser.pending, handlePending)
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isLoggedIn = true;
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, handleRejected)
      .addCase(loginUser.pending, handlePending)
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isLoggedIn = true;
        state.user = action.payload;
        console.log('action.payload;: ', action.payload);
        state.favorites = action.payload.favorites;
      })
      .addCase(loginUser.rejected, handleRejected)
      .addCase(currentUser.pending, state => {
        state.isRefreshing = true;
      })
      .addCase(currentUser.fulfilled, (state, action) => {
        state.isRefreshing = false;

        if (action.payload) {
          state.isLoggedIn = true;
          state.user = action.payload;
          // state.favorites = action.payload.favorites;
        } else {
          state.isLoggedIn = false;
          state.user = { uid: null, name: '', email: '' };
          // state.favorites = [];
        }
      })
      .addCase(currentUser.rejected, (state, action) => {
        state.isRefreshing = false;
        state.error = action.payload;
      })
      .addCase(fetchFavorites.pending, handlePending)
      .addCase(fetchFavorites.fulfilled, (state, action) => {
        state.isLoading = false;
        state.favorites = action.payload;

        const sorted = applySorting(state.favorites, state.sortBy);
        const { paginated, hasMore, lastKey } = paginate(sorted, state.page);
        if (state.page === 1) {
          state.paginatedFavorites = paginated;
        } else {
          state.paginatedFavorites = [
            ...state.paginatedFavorites,
            ...paginated,
          ];
        }
        state.hasMore = hasMore;
        state.lastKey = lastKey;
      })
      .addCase(fetchFavorites.rejected, handleRejected)
      .addCase(toggleFavorite.pending, handlePending)
      .addCase(toggleFavorite.fulfilled, (state, action) => {
        state.isLoading = false;
        state.favorites = action.payload;
      })
      .addCase(toggleFavorite.rejected, handleRejected)
      .addCase(logoutUser.pending, handlePending)
      .addCase(logoutUser.fulfilled, () => {
        return INITIAL_STATE;
      })
      .addCase(logoutUser.rejected, handleRejected),
});

export const {
  setSortByFavorites,
  incrementFavoritesPage,
  resetFavoritesPagination,
} = authSlice.actions;
export const authReducer = authSlice.reducer;
