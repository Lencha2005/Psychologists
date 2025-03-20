// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAAPKK9G77edDxOW3-ZVZt179_TgP1y_-s',
  authDomain: 'psychologists-f3b30.firebaseapp.com',
  projectId: 'psychologists-f3b30',
  storageBucket: 'psychologists-f3b30.firebasestorage.app',
  messagingSenderId: '1034601949225',
  appId: '1:1034601949225:web:c31cac5fe00120ae069438',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
