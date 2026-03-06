import { configureStore } from "@reduxjs/toolkit";
import datasetReducer from "./datasetSlice";
import visualReducer from "./visualSlice";
import uiReducer from "./uiSlice"

export const store = configureStore({
  reducer: {
    dataset: datasetReducer,
    visual: visualReducer,
    ui:uiReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;