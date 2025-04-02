import { createSlice } from '@reduxjs/toolkit';
import {
  currentUser,
  fetchFavorites,
  loginUser,
  logoutUser,
  registerUser,
  toggleFavorite,
} from './operations';

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
  },
  favorites: [],
  isLoggedIn: false,
  isRefreshing: false,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState: INITIAL_STATE,
  extraReducers: builder =>
    builder
      .addCase(registerUser.pending, handlePending)
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isLoggedIn = true;
        state.favorites = action.payload.favorites || [];
      })
      .addCase(registerUser.rejected, handleRejected)
      .addCase(loginUser.pending, handlePending)
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isLoggedIn = true;
        state.favorites = action.payload.favorites;
      })
      .addCase(loginUser.rejected, handleRejected)
      .addCase(currentUser.pending, state => {
        state.isRefreshing = true;
      })
      .addCase(currentUser.fulfilled, (state, action) => {
        if (action.payload) {
          state.user = action.payload;
          state.isLoggedIn = true;
          state.favorites = action.payload.favorites;
        } else {
          state.user = { uid: null, name: '', email: '' };
          state.isLoggedIn = false;
          state.favorites = [];
        }
        state.isRefreshing = false;
      })
      .addCase(currentUser.rejected, (state, action) => {
        state.isRefreshing = false;
        state.error = action.payload;
      })
      .addCase(fetchFavorites.pending, handlePending)
      .addCase(fetchFavorites.fulfilled, (state, action) => {
        state.isLoading = false;
        state.favorites = action.payload.favorites;
      })
      .addCase(fetchFavorites.rejected, handleRejected)
      .addCase(toggleFavorite.pending, handlePending)
      .addCase(toggleFavorite.fulfilled, (state, action) => {
        state.isLoading = false;
        state.favorites = action.payload;
        console.log('state.favorites: ', state.favorites);
      })
      .addCase(toggleFavorite.rejected, handleRejected)
      .addCase(logoutUser.pending, handlePending)
      .addCase(logoutUser.fulfilled, () => {
        return INITIAL_STATE;
      })
      .addCase(logoutUser.rejected, handleRejected),
});

export const authReducer = authSlice.reducer;
