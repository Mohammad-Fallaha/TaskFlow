import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  UserCredential,
} from "firebase/auth";
import { app } from "@/config/firebase";

export const auth = getAuth(app); 

export const login = async (email: string, password: string): Promise<UserCredential> => {
  return await signInWithEmailAndPassword(auth, email, password);
};

export const register = async (email: string, password: string): Promise<UserCredential> => {
  return await createUserWithEmailAndPassword(auth, email, password);
};

export const getCurrentUser = () => {
  return auth.currentUser;
};