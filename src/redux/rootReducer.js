import { combineReducers } from '@reduxjs/toolkit';
import { authReducer } from './auth/slice';
import { psychologistsReducer } from './psychologists/slice';
import { modalReducer } from './modal/slice';
import { themeReducer } from './theme/slice';

const rootReducer = combineReducers({
  auth: authReducer,
  psychologists: psychologistsReducer,
  modal: modalReducer,
  theme: themeReducer,
});

export default rootReducer;
