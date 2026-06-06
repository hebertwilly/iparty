import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";

import { auth } from "../../firebase/config";

export const register = async (email, password) => {
  return await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );
};

export const login = async (email, password) => {
  return await signInWithEmailAndPassword(
    auth,
    email,
    password
  );
};

export const forgotPassword = async (email) => {
  return await sendPasswordResetEmail(
    auth,
    email
  );
};

export const logout = async () => {
  return await signOut(auth);
};