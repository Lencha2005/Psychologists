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
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "theme",
  storage,
  whitelist: ["theme"],
};

const persistedThemeReducer = persistReducer(persistConfig, themeReducer);

export const store = configureStore({
  reducer: {
    auth: authReducer,
    psychologists: psychologistsReducer,
    modal: modalReducer,
    theme: persistedThemeReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);