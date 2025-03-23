import { createAsyncThunk } from '@reduxjs/toolkit';
import { auth } from '../../firebase/firebaseConfig';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from 'firebase/auth';

export const registerUser = createAsyncThunk(
  'auth/register',
  async ({ email, password, name }, { rejectWithValue }) => {
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await updateProfile(user, { displayName: name });
      return { name: user.displayName, email: user.email };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const loginUser = createAsyncThunk(
  'auth/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);

      console.log("Успішний вхід у Firebase:", user);
      console.log("Ім'я користувача у Firebase:", user.displayName);

      return { name: user.displayName || 'User', email: user.email };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const logoutUser = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      await signOut(auth);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);


// const testLogin = async () => {
//     try {
//       const { user } = await signInWithEmailAndPassword(auth, "dad@mail.com", "password123");
//       console.log("Успішний вхід:", user);
//     } catch (error) {
//       console.error("Помилка входу:", error.code, error.message);
//     }
//   };
  
//   testLogin();
