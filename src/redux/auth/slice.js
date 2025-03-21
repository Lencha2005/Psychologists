import { createSlice } from '@reduxjs/toolkit';

const INITIAL_STATE = {
  user: {
    name: null,
    email: null,
  },
  // token,
  isLoggedIn: false,
  isRefreshing: false,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState: INITIAL_STATE,
  extraReducers: builder => builder,
});

export const authReducer = authSlice.reducer;
