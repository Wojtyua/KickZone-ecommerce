import { create } from "zustand";
import {
  getFavorites,
  addToFavorites,
  removeFromFavorites,
} from "@/app/_actions/favoriteActions";

interface FavoritesState {
  favorites: string[];
  isLoading: boolean;
  error: string | null;
  isFetched: boolean;
  fetchFavorites: () => Promise<void>;
  addFavorite: (productId: string) => Promise<void>;
  removeFavorite: (productId: string) => Promise<void>;
}

export const useFavoritesStore = create<FavoritesState>((set, get) => ({
  favorites: [],
  isLoading: false,
  error: null,
  isFetched: false,
  fetchFavorites: async () => {
    const state = get();
    if (state.isFetched) return; // Nie fetchuj, jeśli już zostało zfetchowane

    set({ isLoading: true, error: null });
    try {
      const { success, data, message } = await getFavorites();
      if (success) {
        set({
          favorites: data.map((product: any) => product._id),
          isFetched: true,
        });
      } else {
        set({ error: message });
      }
    } catch (error) {
      set({ error: "Failed to fetch favorites" });
    } finally {
      set({ isLoading: false });
    }
  },
  addFavorite: async (productId: string) => {
    set({ isLoading: true, error: null });
    try {
      const { success, message } = await addToFavorites(productId);
      if (success) {
        set((state) => ({ favorites: [...state.favorites, productId] }));
      } else {
        set({ error: message });
      }
    } catch (error) {
      set({ error: "Failed to add favorite" });
    } finally {
      set({ isLoading: false });
    }
  },
  removeFavorite: async (productId: string) => {
    set({ isLoading: true, error: null });
    try {
      const { success, message } = await removeFromFavorites(productId);
      if (success) {
        set((state) => ({
          favorites: state.favorites.filter((id) => id !== productId),
        }));
      } else {
        set({ error: message });
      }
    } catch (error) {
      set({ error: "Failed to remove favorite" });
    } finally {
      set({ isLoading: false });
    }
  },
}));
