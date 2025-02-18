import { configureStore, combineReducers } from "@reduxjs/toolkit";
import AlertDataSlice from "./storeSlices/AlertDataSlice";
import UserSlice from "./storeSlices/UserStoreSlice";
//import ProductSlice from "./storeSlices/ProductStoreSlice";
import CartSlice from "../components/features/cart/CartSlice";
import CheckoutSlice from "../components/features/checkout/CheckoutSlice";
import OrderSlice from "../components/features/orders/OrderSlice";
import ProductSlice from "../components/features/product/productFeature/ProductSlice";
import { productsApi } from "../components/features/product/productFeature/productsApi";
console.log({ productsApi });
const allReducer = combineReducers({
  AlertDataSlice,
  UserSlice,
  CartSlice,
  CheckoutSlice,
  OrderSlice,
  ProductSlice,
  [productsApi.reducerPath]: productsApi.reducer,
});

const store = configureStore({
  reducer: {
    AlertDataSlice,
    UserSlice,
    CartSlice,
    CheckoutSlice,
    OrderSlice,
    ProductSlice,
    [productsApi.reducerPath]: productsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productsApi.middleware),
});

export default store;
