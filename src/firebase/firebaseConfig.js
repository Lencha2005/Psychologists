// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCfRFiFkPFWQcXRvaqbsAUafHvjVWFloII",
  authDomain: "psychologists-eae8e.firebaseapp.com",
  projectId: "psychologists-eae8e",
  storageBucket: "psychologists-eae8e.firebasestorage.app",
  messagingSenderId: "308542041228",
  appId: "1:308542041228:web:dd531b9f151fe2704e9fa9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
console.log('app: ', app);
export const auth = getAuth(app);
export const db = getFirestore(app);
console.log('db: ', db);
