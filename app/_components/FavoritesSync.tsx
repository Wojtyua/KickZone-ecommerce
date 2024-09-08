"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useFavoritesStore } from "@/app/_store/favoritesStore";

export default function FavoritesSync() {
  const { status } = useSession();
  const { fetchFavorites, isFetched } = useFavoritesStore();

  useEffect(() => {
    if (status === "authenticated" && !isFetched) {
      fetchFavorites();
    }
  }, [status, fetchFavorites, isFetched]);

  return null;
}
