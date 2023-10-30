// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getDatabase} from "firebase/database";
import {getAuth} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyARBznYzRkVLq-NnJ7J65F0pWEklzY1GP8",
  authDomain: "mealfinderjessehernandez.firebaseapp.com",
  projectId: "mealfinderjessehernandez",
  storageBucket: "mealfinderjessehernandez.appspot.com",
  messagingSenderId: "626321293981",
  appId: "1:626321293981:web:1159fa6a195e766b898a74",
  measurementId: "G-7592LKHTKY"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


//Initialize  database
export const db = getDatabase(app);
export const FIREBASE_AUTH = getAuth(app);