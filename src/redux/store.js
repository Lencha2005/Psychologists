import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./auth/slice";
import { psychologistReduser } from "./psychologists/slice";
import { themeReduser } from "./theme/slice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        psyhologist: psychologistReduser,
        theme: themeReduser,
    }
})