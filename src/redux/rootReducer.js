import { combineReducers } from '@reduxjs/toolkit';
import { authReducer } from './auth/slice';
import { psychologistsReducer } from './psychologists/slice';
import { modalReducer } from './modal/slice';
import { themeReducer } from './theme/slice';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const authPersistConfig = {
  key: 'auth',
  storage,
  blacklist: [
    'sortBy',
    'page',
    'lastKey',
    'hasMore',
    'paginatedFavorites',
    'isLoading',
    'error',
  ],
};

const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
  psychologists: psychologistsReducer,
  modal: modalReducer,
  theme: themeReducer,
});

export default rootReducer;
