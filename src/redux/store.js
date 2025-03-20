import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./auth/slice";
import { psychologistReduser } from "./psychologist/slice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        psyhologist: psychologistReduser,
    }
})