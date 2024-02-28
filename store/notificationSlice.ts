import { create } from "zustand";

interface NotificationState {
  isOpen: boolean;
  message: string | null;
  setNotificationClose: (value: boolean) => void;
  setNotification: (value: boolean, message: string) => void;
  // setMessage: (value: string) => void;
}

export const useNotificationStore = create<NotificationState>((set) => ({
  isOpen: false,
  message: "",
  setNotificationClose: (value: boolean) => set({ isOpen: value }),
  // setMessage: (value) => set({ message: value }),
  setNotification: (isOpen: boolean, message: string) =>
    set({ isOpen, message }),
}));
