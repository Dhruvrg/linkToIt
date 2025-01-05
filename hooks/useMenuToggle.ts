import { create } from "zustand";

interface MenuState {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useMenuToggle = create<MenuState>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useMenuToggle;
