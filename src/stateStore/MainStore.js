import { configureStore, combineReducers } from "@reduxjs/toolkit";
import AlertDataSlice from "./storeSlices/AlertDataSlice";
import CartSlice from "../components/features/cart/CartSlice";
import CheckoutSlice from "../components/features/checkout/CheckoutSlice";
import OrderSlice from "../components/features/orders/OrderSlice";
import ProductSlice from "../components/features/product/productFeature/ProductSlice";
import AuthSlice from "../mainPages/login-auth/AuthSlice";
import { productsApi } from "../components/features/product/productFeature/productsApi";
import { authApi } from "../mainPages/login-auth/authApi";

const store = configureStore({
  reducer: {
    AlertDataSlice,
    CartSlice,
    CheckoutSlice,
    OrderSlice,
    ProductSlice,
    AuthSlice,
    [productsApi.reducerPath]: productsApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productsApi.middleware, authApi.middleware),
});

export default store;
