import { create } from "zustand";

type User = {
  id: number;
  fullName: string;
  email: string;
  role: "ADMIN" | "VET" | "RECEPTIONIST";
};

type AuthStore = {
  token: string | null;
  user: User | null;

  setToken: (token: string) => void;
  setUser: (user: User) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthStore>((set) => ({
  token: null,
  user: null,

  setToken: (token) =>
    set({
      token,
    }),

  setUser: (user) =>
    set({
      user,
    }),

  logout: () =>
    set({
      token: null,
      user: null,
    }),
}));