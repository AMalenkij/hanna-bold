import { create } from "zustand";
import type { Concert } from "@prisma/client";

type DialogMode = "create" | "edit" | "del";

interface ConcertFormStore {
  isOpen: boolean;
  mode: DialogMode;
  currentConcert: Concert | null;
  setCurrentConcert: (concert: Concert | null) => void;
  openCreateDialog: () => void;
  openEditDialog: (concert: Concert) => void;
  openDelDialog: (concert: Concert) => void;
  closeDialog: () => void;
}

export const useConcertFormStore = create<ConcertFormStore>((set) => ({
  isOpen: false,
  mode: "create",
  currentConcert: null,
  setCurrentConcert: (concert) => set({ currentConcert: concert }),
  openCreateDialog: () =>
    set({
      isOpen: true,
      mode: "create",
      currentConcert: null,
    }),
  openEditDialog: (concert) =>
    set({
      isOpen: true,
      mode: "edit",
      currentConcert: concert,
    }),
  openDelDialog: (concert) =>
    set({
      isOpen: true,
      mode: "del",
      currentConcert: concert,
    }),

  closeDialog: () =>
    set({
      isOpen: false,
      currentConcert: null,
    }),
}));
