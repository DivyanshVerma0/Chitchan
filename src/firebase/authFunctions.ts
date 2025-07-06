import { GoogleAuthProvider, signInWithPopup, signOut, signInWithEmailAndPassword } from "firebase/auth"; 

import { auth } from "./clientApp";

export const signInWithGoogle: any = async () =>
  signInWithPopup(auth, new GoogleAuthProvider());

export const signUpWithEmailAndPassword = async (
  email: string,
  password: string
) => {};

export const loginWithEmaiAndPassword = async (
  email: string,
  password: string
) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    throw error;
  }
};

export const logout = () => signOut(auth);
