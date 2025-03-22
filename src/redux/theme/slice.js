import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  theme: "green",
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setTheme: (state, action) => {
      state.theme = action.payload;
    },
  },
});

export const themeReducer = themeSlice.reducer;
export const { setTheme } = themeSlice.actions;