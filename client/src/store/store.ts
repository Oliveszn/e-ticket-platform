"use client";
import { configureStore } from "@reduxjs/toolkit";
import formReducer from "./createevent-slice";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage"; // localStorage
import { combineReducers } from "redux";
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import authReducer from "./auth-slice";
import eventReducer from "./event-slice";
import ticketReducer from "./tickets-slice";
import paymentReducer from "./order-slice";
import { injectStore } from "@/api/client";

const rootReducer = combineReducers({
  form: formReducer,
  auth: authReducer, // not persisted
  event: eventReducer,
  ticket: ticketReducer,
  payment: paymentReducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["form"], // only form will persist
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

///learnt its best practice to add serializable checks here, especailly when storing complex checks like dates
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

injectStore(store);

export const persistor = persistStore(store);
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
