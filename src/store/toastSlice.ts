import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type ToastType = "success" | "warning" | "error";

export interface ToastItem {
  id: string;
  message: string;
  description?: string;
  type: ToastType;
  duration?: number;
}

interface ToastState {
  toasts: ToastItem[];
}

const initialState: ToastState = {
  toasts: [],
};

const toastSlice = createSlice({
  name: "toast",
  initialState,
  reducers: {
    addToast: (state, action: PayloadAction<Omit<ToastItem, "id">>) => {
      const id = window.crypto.randomUUID ? window.crypto.randomUUID() : Math.random().toString(36).substring(2, 9);
      state.toasts.push({ ...action.payload, id });
    },
    removeToast: (state, action: PayloadAction<string>) => {
      state.toasts = state.toasts.filter((toast) => toast.id !== action.payload);
    },
  },
});

export const { addToast, removeToast } = toastSlice.actions;
export default toastSlice.reducer;
