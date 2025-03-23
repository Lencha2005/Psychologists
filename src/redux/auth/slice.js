import { createSlice } from '@reduxjs/toolkit';
import { currentUser, loginUser, logoutUser, registerUser } from './operations';

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
  },
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
      })
      .addCase(registerUser.rejected, handleRejected)
      .addCase(loginUser.pending, handlePending)
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isLoggedIn = true;
      })
      .addCase(loginUser.rejected, handleRejected)
      .addCase(currentUser.pending, state => {
        state.isRefreshing = true;
      })
      .addCase(currentUser.fulfilled, (state, action) => {
        if(action.payload) {
          state.user = action.payload;
        state.isLoggedIn = true;
        } else {
          state.user = {name:'', email:''};
          state.isLoggedIn = false;
        }
        state.isRefreshing = false;
      
      })
      .addCase(currentUser.rejected, (state, action) => {
        state.isRefreshing = false;
        state.error = action.payload;
      })
      .addCase(logoutUser.pending, handlePending)
      .addCase(logoutUser.fulfilled, state => {
        return INITIAL_STATE;
      })
      .addCase(logoutUser.rejected, handleRejected)
});

export const authReducer = authSlice.reducer;
