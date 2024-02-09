// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "real-estate-37b64.firebaseapp.com",
  projectId: "real-estate-37b64",
  storageBucket: "real-estate-37b64.appspot.com",
  messagingSenderId: "149506438395",
  appId: "1:149506438395:web:45a80ac52fa83948e9ac5e"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);