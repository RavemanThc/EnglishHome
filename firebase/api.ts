import { ref, get, set } from "firebase/database";
import { db } from "./config";
import { Teacher } from "@/types/teachers";

export const getTeachers = async (): Promise<Teacher[]> => {
  const snapshot = await get(ref(db, "teachers"));

  if (!snapshot.exists()) {
    return [];
  }

  const data = snapshot.val();

  return Object.entries(data).map(([id, teacher]) => ({
    id,
    ...(teacher as Omit<Teacher, "id">),
  }));
};
export const getFavorites = async (uid: string): Promise<string[]> => {
  const snapshot = await get(ref(db, `users/${uid}/favorites`));

  if (!snapshot.exists()) {
    return [];
  }

  return Object.keys(snapshot.val());
};
export const addFavorite = async (uid: string, teacherId: string) => {
  await set(ref(db, `users/${uid}/favorites/${teacherId}`), true);
};
export const removeFavorite = async (uid: string, teacherId: string) => {
  await set(ref(db, `users/${uid}/favorites/${teacherId}`), null);
};
