import { createAsyncThunk } from '@reduxjs/toolkit';
import { ref, get, set, remove } from 'firebase/database';
import { auth, db } from '../../firebase/firebaseConfig';
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
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

      const userId = user.uid;
      const userRef = ref(db, `users/${userId}`);

      const snapshot = await get(userRef);
      if (!snapshot.exists()) {
        await set(userRef, { name, email, favorites: [] });
      }

      return {
        uid: userId,
        name: user.displayName,
        email: user.email,
        token: await user.getIdToken(), 
        favorites: [],
      };
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

      const userId = user.uid;
      const token = await user.getIdToken(); 

      const userRef = ref(db, `users/${userId}`);
      const snapshot = await get(userRef);

      let favorites = [];
      if (snapshot.exists()) {
        const val = snapshot.val();
        favorites = val.favorites ? Object.values(val.favorites) : [];
      } else {
        await set(userRef, {
          name: user.displayName,
          email: user.email,
          favorites: [],
        });
      }

      return {
        uid: userId,
        name: user.displayName,
        email: user.email,
        token, 
        favorites,
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const currentUser = createAsyncThunk(
  'auth/checkAuth',
  async (_, { rejectWithValue }) => {
    return new Promise(resolve => {
      onAuthStateChanged(auth, async user => {
        if (!user) {
          return resolve(null);
        }

        const token = await user.getIdToken();
        const userId = user.uid;
        const userRef = ref(db, `users/${userId}`);
        const snapshot = await get(userRef);

        let favorites = [];
        if (snapshot.exists()) {
          const val = snapshot.val();
          favorites = val.favorites ? Object.values(val.favorites) : [];
        }

        resolve({
          uid: userId,
          name: user.displayName,
          email: user.email,
          token, 
          favorites,
        });
      });
    });
  }
);

export const fetchFavorites = createAsyncThunk(
  'auth/fetchFavorites',
  async (_, { rejectWithValue }) => {
    try {
      const userId = auth.currentUser?.uid;
      if (!userId) return rejectWithValue('User not authenticated');

      const dbRef = ref(db, `users/${userId}/favorites`);
      const snapshot = await get(dbRef);

      if (!snapshot.exists()) return [];

      return Object.values(snapshot.val());
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const toggleFavorite = createAsyncThunk(
  'auth/toggleFavorite',
  async (psychologist, { rejectWithValue }) => {
    try {
      const userId = auth.currentUser?.uid;
      if (!userId) return rejectWithValue('User not authenticated');

      const favRef = ref(db, `users/${userId}/favorites/${psychologist.id}`);
      const snapshot = await get(favRef);

      if (snapshot.exists()) {
        await remove(favRef);
      } else {
        await set(favRef, { ...psychologist, id: psychologist.id });
      }

      const updatedSnapshot = await get(ref(db, `users/${userId}/favorites`));
      return Object.values(updatedSnapshot.val() || []);
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
