"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { addFavorite, getFavorites, removeFavorite } from "../../firebase/api";

export const useFavorites = (uid?: string) => {
  const queryClient = useQueryClient();

  const favoritesQuery = useQuery({
    queryKey: ["favorites", uid],
    queryFn: () => getFavorites(uid!),
    enabled: !!uid,
    staleTime: 1000 * 60 * 5,
  });

  const toggleMutation = useMutation({
    mutationFn: async (teacherId: string) => {
      if (!uid) {
        throw new Error("User is not authenticated");
      }

      const favorites = favoritesQuery.data ?? [];

      if (favorites.includes(teacherId)) {
        await removeFavorite(uid, teacherId);

        return {
          teacherId,
          isFavorite: false,
        };
      }

      await addFavorite(uid, teacherId);

      return {
        teacherId,
        isFavorite: true,
      };
    },

    onSuccess: ({ teacherId, isFavorite }) => {
      queryClient.setQueryData<string[]>(
        ["favorites", uid],
        (oldFavorites = []) => {
          if (isFavorite) {
            return [...oldFavorites, teacherId];
          }

          return oldFavorites.filter((id) => id !== teacherId);
        },
      );
    },
  });

  return {
    favorites: favoritesQuery.data ?? [],
    toggleFavorite: toggleMutation.mutateAsync,
    isLoading: favoritesQuery.isLoading,
    isToggling: toggleMutation.isPending,
  };
};
