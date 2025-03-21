import { createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../../firebase/firebaseConfig";
import { ref, get } from "firebase/database";

export const fetchPsychologists = createAsyncThunk(
  "psychologists/fetchPsychologists",
  async (_, thunkAPI) => {
    try {
      const snapshot = await get(ref(db, "psychologists"));
      if (snapshot.exists()) {
        console.log("Psychologists Data:", snapshot.val());
        return Object.values(snapshot.val()); // Отримуємо масив психологів
      } else {
        return [];
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);