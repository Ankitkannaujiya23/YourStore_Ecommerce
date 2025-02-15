import { configureStore, combineReducers } from "@reduxjs/toolkit";
import AlertDataSlice from "./storeSlices/AlertDataSlice";
import UserSlice from "./storeSlices/UserStoreSlice";
//import ProductSlice from "./storeSlices/ProductStoreSlice";
import CartSlice from "../components/features/cart/CartSlice";
import CheckoutSlice from "../components/features/checkout/CheckoutSlice";
import OrderSlice from "../components/features/orders/OrderSlice";
import ProductSlice from '../components/features/product/productFeature/ProductSlice'
const allReducer = combineReducers({
  AlertDataSlice,
  UserSlice,
  CartSlice,
  CheckoutSlice,
  OrderSlice,
  ProductSlice
});

const store = configureStore({
  reducer: allReducer,
});

export default store;
