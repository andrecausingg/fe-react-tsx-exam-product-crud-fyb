import { configureStore } from "@reduxjs/toolkit";

import productSliceReducer from "./features/product/productSlice";

export const store = configureStore({
  reducer: {
    product: productSliceReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {counter: counterReducer}
export type AppDispatch = typeof store.dispatch;
