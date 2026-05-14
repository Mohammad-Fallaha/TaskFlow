import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAflu0Q9cusxPjwcVTbVGabdJd85gQbi2U",
  authDomain: "taskflow-4eea0.firebaseapp.com",
  projectId: "taskflow-4eea0",
  storageBucket: "taskflow-4eea0.firebasestorage.app",
  messagingSenderId: "136264778225",
  appId: "1:136264778225:web:247c9032600d8fce624450"
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export { app };