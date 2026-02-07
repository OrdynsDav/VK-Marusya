import { create } from 'zustand';
import { fetchProfile } from '../api/fetches';

interface AuthState {
  isAuth: boolean;
  profile: {
    email: string;
    name: string;
    surname: string;
    favorites: string[]; // ID фильмов
  } | null;
  setAuth: (email: string, name: string, surname: string, favorites: string[]) => void;
  logout: () => void;
  updateFavorites: (favorites: string[]) => void;
  initializeAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuth: false,
  profile: null,
  setAuth: (email, name, surname, favorites) =>
  set({
    isAuth: true,
    profile: {
      email,
      name,
      surname,
      favorites: Array.isArray(favorites) ? favorites : [],
    },
  }),

  logout: () =>
    set({
      isAuth: false,
      profile: null,
    }),
  updateFavorites: (favorites) =>
  set((state) => ({
    profile: state.profile
      ? { ...state.profile, favorites: Array.isArray(favorites) ? favorites : [] }
      : null,
  })),


  initializeAuth: async () => {
    try {
      const profile = await fetchProfile();
      set({
        isAuth: true,
        profile,
      });
    } catch (error) {
      set({ isAuth: false, profile: null });
    }
  },

}));
