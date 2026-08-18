import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  type User,
} from "firebase/auth";

import { auth } from "./config";
export type RegisterRequest = {
  email: string;
  password: string;
  userName: string;
};

export const register = async (data: RegisterRequest) => {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    data.email,
    data.password,
  );

  await updateProfile(userCredential.user, {
    displayName: data.userName,
  });

  return userCredential.user;
};

export const login = async (email: string, password: string) => {
  const userCredential = await signInWithEmailAndPassword(
    auth,
    email,
    password,
  );

  return userCredential.user;
};

export const logout = async () => {
  await signOut(auth);
};

export const subscribeToAuth = (callback: (user: User | null) => void) => {
  return onAuthStateChanged(auth, callback);
};
