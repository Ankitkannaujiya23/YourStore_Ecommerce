import { createSlice } from "@reduxjs/toolkit";
imp;
const ProductSlice = createSlice({
  name: "Product_Slice",
  initialState: [],
  reducers: {
    addProduct(state, action) {},
    editProduct(state, action) {},
    deleteProduct(state, action) {},
  },
});

export const { addProduct, editProduct, deleteProduct } = ProductSlice.actions;
export default ProductSlice.reducer;
