import { create } from "zustand";

interface BurgerSlice {
  loading: boolean;
  setLoading: (value: boolean) => void;
}

export const useNavStore = create<BurgerSlice>((set) => ({
  loading: false,
  setLoading: (value) => set({ loading: value }),
}));
