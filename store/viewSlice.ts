import { create } from "zustand";

interface ViewState {
  selection: string | null;
  setView: (selection: string) => void;
}

export const useViewStore = create<ViewState>((set) => ({
  selection: "overview",
  setView: (selection) => set((state) => ({ ...state, selection })),
}));
