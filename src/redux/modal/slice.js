import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isRegistrationModalOpen: false,
  isLoginModalOpen: false,
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openRegistrationModal: state => {
      state.isRegistrationModalOpen = true;
    },
    closeRegistrationModal: state => {
      state.isRegistrationModalOpen = false;
    },
    openLoginModal: state => {
      state.isLoginModalOpen = true;
    },
    closeLoginModal: state => {
      state.isLoginModalOpen = false;
    },
  },
});

export const {
  openRegistrationModal,
  closeRegistrationModal,
  openLoginModal,
  closeLoginModal,
} = modalSlice.actions;

export const modalReducer = modalSlice.reducer;
