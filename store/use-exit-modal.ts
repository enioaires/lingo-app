import { create } from "zustand";

type UseExitModalState = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
};

export const useExitModal = create<UseExitModalState>((set) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
}));
