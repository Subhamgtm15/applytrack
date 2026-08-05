import { create } from "zustand";
import { fetchCurrentUser } from "../services/api";

export interface User {
  fullName: string;
  email: string;
  currentPosition: string;
  targetPosition: string;
  linkedin: string;
}

interface AuthState {
  user: User | null;
  loading: boolean;
  setUser: (user: User | null) => void;
  clearUser: () => void;
  initAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: true,
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),
  initAuth: async () => {
    try {
      const response = await fetchCurrentUser();
      set({ user: response.user, loading: false });
    } catch (error) {
      console.error("Error fetching user:", error);
      set({ loading: false });
    }
  },
}));
