// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDbmrnQ8yAHfNGCm3U91Tc4sQCkx6a_ZX4",
  authDomain: "finency-289e8.firebaseapp.com",
  projectId: "finency-289e8",
  storageBucket: "finency-289e8.appspot.com",
  messagingSenderId: "1082075199924",
  appId: "1:1082075199924:web:c11459912dca7eee94dae1",
  measurementId: "G-CP8BV3GQ4X"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app); // ✅ correctly initialize auth
export { auth }; // ✅ correctly export it
