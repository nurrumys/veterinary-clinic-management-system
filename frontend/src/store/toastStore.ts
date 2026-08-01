import { create } from "zustand";

type ToastType = "success" | "error" | "warning" | "info";

type Toast = {
  message: string;
  type: ToastType;
};

type ToastStore = {
  toast: Toast | null;

  showToast: (message: string, type?: ToastType) => void;
  hideToast: () => void;
};

export const useToastStore = create<ToastStore>((set) => ({
  toast: null,

  showToast: (message, type = "info") =>
    set({
      toast: {
        message,
        type,
      },
    }),

  hideToast: () =>
    set({
      toast: null,
    }),
}));