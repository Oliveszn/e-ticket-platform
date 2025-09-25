"use client";
import { configureStore } from "@reduxjs/toolkit";
import formReducer from "./createevent-slice";

const store = configureStore({
  reducer: {
    form: formReducer,
  },
});
export default store;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
