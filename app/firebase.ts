import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBxGcJQSX9An_xfnXvBiz9dhYONjQR4eMU",
  authDomain: "chat-app-d7b4b.firebaseapp.com",
  projectId: "chat-app-d7b4b",
  storageBucket: "chat-app-d7b4b.appspot.com",
  messagingSenderId: "214392777808",
  appId: "1:214392777808:web:a8b0a6e3435bbac28a3555",
  measurementId: "G-V8TCX20YFB",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = typeof window !== "undefined" && getAnalytics(app);
export const auth = getAuth(app);
export const storage = getStorage();
export const db = getFirestore();
