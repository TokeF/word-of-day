import { configureStore } from "@reduxjs/toolkit";
import wordReducer from "./wordSlice";

const store = configureStore({
  reducer: {
    words: wordReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>; // global state
export type AppDispatch = typeof store.dispatch; // global dispatcher

export default store;
