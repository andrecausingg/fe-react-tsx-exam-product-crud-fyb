import { configureStore } from "@reduxjs/toolkit";

// import loginSliceReducer from "./features/login/loginSlice";


export const store = configureStore({
  reducer: {
    // Auth
    // login: loginSliceReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {counter: counterReducer}
export type AppDispatch = typeof store.dispatch;
