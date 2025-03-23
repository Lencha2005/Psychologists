import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./auth/slice";
import { psychologistsReducer } from "./psychologists/slice";
import { themeReducer } from "./theme/slice";
import { modalReducer } from "./modal/slice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        psychologists: psychologistsReducer,
        modal: modalReducer,
        theme: themeReducer,
    }
})