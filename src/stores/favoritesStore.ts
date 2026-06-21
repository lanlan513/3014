import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Favorite {
  recordId: string;
  savedAt: number;
  personalNote?: string;
}

interface FavoritesStore {
  favorites: Favorite[];
  addFavorite: (recordId: string, personalNote?: string) => void;
  removeFavorite: (recordId: string) => void;
  isFavorite: (recordId: string) => boolean;
  toggleFavorite: (recordId: string) => void;
  updateNote: (recordId: string, note: string) => void;
  getFavoritesCount: () => number;
}

export const useFavoritesStore = create<FavoritesStore>()(
  persist(
    (set, get) => ({
      favorites: [],

      addFavorite: (recordId, personalNote) => {
        set((state) => ({
          favorites: [
            ...state.favorites,
            {
              recordId,
              savedAt: Date.now(),
              personalNote,
            },
          ],
        }));
      },

      removeFavorite: (recordId) => {
        set((state) => ({
          favorites: state.favorites.filter((f) => f.recordId !== recordId),
        }));
      },

      isFavorite: (recordId) => {
        return get().favorites.some((f) => f.recordId === recordId);
      },

      toggleFavorite: (recordId) => {
        const { isFavorite, addFavorite, removeFavorite } = get();
        if (isFavorite(recordId)) {
          removeFavorite(recordId);
        } else {
          addFavorite(recordId);
        }
      },

      updateNote: (recordId, note) => {
        set((state) => ({
          favorites: state.favorites.map((f) =>
            f.recordId === recordId ? { ...f, personalNote: note } : f
          ),
        }));
      },

      getFavoritesCount: () => {
        return get().favorites.length;
      },
    }),
    {
      name: 'midnight-record-store-favorites',
    }
  )
);
