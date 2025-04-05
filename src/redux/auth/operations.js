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
        token: await user.getIdToken(), // ✅
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
    console.log('🔐 loginUser → Start login process');
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      console.log('✅ loginUser → Authenticated user:', user);
      
      const userId = user.uid;
      const token = await user.getIdToken(); // ✅
      console.log('🔑 loginUser → Received token:', token);

      const userRef = ref(db, `users/${userId}`);
      const snapshot = await get(userRef);
      console.log('📦 loginUser → DB snapshot exists:', snapshot.exists());

      let favorites = [];
      if (snapshot.exists()) {
        const val = snapshot.val();
        favorites = val.favorites ? Object.values(val.favorites) : [];
        console.log('❤️ loginUser → Loaded favorites:', favorites);
      } else {
        await set(userRef, {
          name: user.displayName,
          email: user.email,
          favorites: [],
        });
        console.log('📥 loginUser → Created new user entry in DB');
      }

      console.log('🎉 loginUser → Returning user data');
      return {
        uid: userId,
        name: user.displayName,
        email: user.email,
        token, // ✅
        favorites,
      };
    } catch (error) {
      console.error('❌ loginUser → Login failed:', error.message);
      return rejectWithValue(error.message);
    }
  }
);

export const currentUser = createAsyncThunk(
  'auth/checkAuth',
  async (_, { rejectWithValue }) => {
    console.log('👤 currentUser → Checking auth state');
    return new Promise(resolve => {
      onAuthStateChanged(auth, async user => {
        if (!user) {
          console.log('👤 currentUser → No user logged in');
          return resolve(null);
        }

        console.log('👤 currentUser → User detected:', user);

        const token = await user.getIdToken(); // ✅
        const userId = user.uid;
        const userRef = ref(db, `users/${userId}`);
        const snapshot = await get(userRef);

        console.log('📦 currentUser → DB snapshot exists:', snapshot.exists());

        let favorites = [];
        if (snapshot.exists()) {
          const val = snapshot.val();
          favorites = val.favorites ? Object.values(val.favorites) : [];
          console.log('❤️ currentUser → Loaded favorites:', favorites);
        }

        console.log('✅ currentUser → Returning user data');
        resolve({
          uid: userId,
          name: user.displayName,
          email: user.email,
          token, // ✅
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
