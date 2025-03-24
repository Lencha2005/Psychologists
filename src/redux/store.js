import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from './auth/slice';
import { psychologistsReducer } from './psychologists/slice';
import { themeReducer } from './theme/slice';
import { modalReducer } from './modal/slice';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'favorites',
  storage,
  whitelist: ['favorites'],
};

const persistedCarsReducer = persistReducer(
  persistConfig,
  psychologistsReducer
);

export const store = configureStore({
  reducer: {
    auth: authReducer,
    psychologists: persistedCarsReducer,
    modal: modalReducer,
    theme: themeReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
