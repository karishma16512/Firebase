import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBvrPNBHGEhmRsxP2HlYpyOwWl15bkn3-U",
  authDomain: "smarttax-a2a3c.firebaseapp.com",
  projectId: "smarttax-a2a3c",
  storageBucket: "smarttax-a2a3c.firebasestorage.app",
  messagingSenderId: "83357116455",
  appId: "1:83357116455:web:17d4fff0655c7a54128602",
  measurementId: "G-X2393MTQT6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = typeof window !== "undefined" ? getAnalytics(app) : null;
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, analytics, auth, db, storage };
