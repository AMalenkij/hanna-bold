import { create } from "zustand";
// import type { Concert } from "./types";

// type DialogMode = "create" | "edit" | "del";

// interface FormStore {
//   isOpen: boolean;
//   mode: DialogMode;
//   current: Concert | null;
//   setCurrent: (data: Concert | null) => void;
//   // openCreateDialog: () => void;
//   // openEditDialog: (concert: Concert) => void;
//   openDelDialog: (concert: Concert) => void;
//   closeDialog: () => void;
// }

export const useModelFormStore = create((set) => ({
  isOpen: false,
  mode: "",
  current: null,
  setCurrent: (data: never) => set({ current: data }),

  openCreateDialog: (data: never) =>
    set({
      isOpen: true,
      mode: "add",
      current: data,
    }),
  openEditDialog: (data) =>
    set({
      isOpen: true,
      mode: "edit",
      current: data,
    }),
  openDelDialog: (data: never) =>
    set({
      isOpen: true,
      mode: "del",
      current: data,
    }),

  closeDialog: () =>
    set({
      isOpen: false,
      current: null,
    }),
}));
