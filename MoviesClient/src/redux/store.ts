import { configureStore } from "@reduxjs/toolkit";
import tokenReducer from "./features/token/tokenSlice"

const store = configureStore({
  reducer: {
    token: tokenReducer
  }
});

// Define types for hooks
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;