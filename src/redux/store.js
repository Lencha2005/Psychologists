import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./auth/slice";
import { psychologistReducer } from "./psychologists/slice";
import { themeReducer } from "./theme/slice";
import { modalReducer } from "./modal/slice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        psyhologist: psychologistReducer,
        modal: modalReducer,
        theme: themeReducer,
    }
})