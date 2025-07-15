// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
/*
const firebaseConfig = {
  apiKey: "AIzaSyDYgEj9nQ_mjR84CzsGS6lKdBWYIrfNkOs",
  authDomain: "todo-coffee.firebaseapp.com",
  projectId: "todo-coffee",
  storageBucket: "todo-coffee.firebasestorage.app",
  messagingSenderId: "350627980798",
  appId: "1:350627980798:web:d8010f87b7d6f45ef8ccaf"
};
*/
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTHDOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECTID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGEBUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGINGSENDERID,
  appId: import.meta.env.VITE_FIREBASE_APPID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//export use anywhere in project
export const auth = getAuth(app);
export const db = getFirestore(app);