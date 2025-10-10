import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer, 
  FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER 
} from "redux-persist";
import storage from "redux-persist/lib/storage";

import AuthReducer from "../slice/auth";
import ProductReducer from "../slice/product.slice";
import CartReducer from "../slice/cart.slice";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["cart"], 
};

const rootReducer = combineReducers({
  auth: AuthReducer,
  product: ProductReducer,
  cart: CartReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

