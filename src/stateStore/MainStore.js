import { configureStore, combineReducers } from "@reduxjs/toolkit";
import AlertDataSlice from "./storeSlices/AlertDataSlice";
import CartSlice from "../components/features/cart/CartSlice";
import CheckoutSlice from "../components/features/checkout/CheckoutSlice";
import OrderSlice from "../components/features/orders/OrderSlice";
import ProductSlice from "../components/features/product/productFeature/ProductSlice";
import AuthSlice from "../mainPages/login-auth/AuthSlice";
import { productsApi } from "../components/features/product/productFeature/productsApi";
import { authApi } from "../mainPages/login-auth/authApi";
import  storage from 'redux-persist/lib/storage'; 
import {persistReducer, persistStore} from "redux-persist";

const persistConfig={
  key:"root",
  storage,
  whitelist:['AuthSlice','CartSlice']
};

const rootReducer = combineReducers({
  AlertDataSlice,
  CartSlice,
  CheckoutSlice,
  OrderSlice,
  ProductSlice,
  AuthSlice,
  [productsApi.reducerPath]: productsApi.reducer,
  [authApi.reducerPath]: authApi.reducer,
})

  const persistedReducer= persistReducer(persistConfig, rootReducer)

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productsApi.middleware, authApi.middleware),
});

export const persistor= persistStore(store);

export default store;
