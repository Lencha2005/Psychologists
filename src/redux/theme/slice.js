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

export const themeReduser = themeSlice.reducer;
export const { setTheme } = themeSlice.actions;