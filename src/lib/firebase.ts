import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
const firebaseConfig = {
  apiKey: "AIzaSyADQRIWmCSDnBE_wV1bOUDP_0uNNsN7h60",
  authDomain: "myprand-a10b1.firebaseapp.com",
  projectId: "myprand-a10b1",
  storageBucket: "myprand-a10b1.firebasestorage.app",
  messagingSenderId: "978532603388",
  appId: "1:978532603388:web:48b6f4ed3794903e6c8e79",
  measurementId: "G-HWL8126Q22",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();
export { signInWithPopup };