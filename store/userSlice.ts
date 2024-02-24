import { create } from "zustand";

interface UserState {
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  badgeNumber: string | null;
  setUser: (
    firstName: string,
    lastName: string,
    email: string,
    badgeNumber: string
  ) => void;
  // clearUser: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  firstName: null,
  lastName: null,
  email: null,
  badgeNumber: null,
  setUser: (firstName, lastName, email, badgeNumber) =>
    set((state) => ({ ...state, firstName, lastName, email, badgeNumber })),
}));
