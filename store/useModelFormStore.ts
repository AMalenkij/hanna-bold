import { create } from "zustand";

interface Concert {
  id: string;
  title: string;
  // другие свойства...
}

type DialogMode = "create" | "edit" | "del";

interface FormStore {
  isOpen: boolean;
  mode: DialogMode | null; // Учитывайте, что это может быть null
  current: Concert | null;
  setCurrent: (data: Concert | null) => void;
  openCreateDialog: (data: Concert) => void;
  openEditDialog: (data: Concert) => void;
  openDelDialog: (data: Concert) => void;
  closeDialog: () => void;
}

export const useModelFormStore = create<FormStore>((set) => ({
  isOpen: false,
  mode: null,
  current: null,
  setCurrent: (data: Concert | null) => set({ current: data }),

  openCreateDialog: (data: Concert) =>
    set({
      isOpen: true,
      mode: "create",
      current: data,
    }),

  openEditDialog: (data: Concert) =>
    set({
      isOpen: true,
      mode: "edit",
      current: data,
    }),

  openDelDialog: (data: Concert) =>
    set({
      isOpen: true,
      mode: "del",
      current: data,
    }),

  closeDialog: () =>
    set({
      isOpen: false,
      mode: null,
      current: null,
    }),
}));
