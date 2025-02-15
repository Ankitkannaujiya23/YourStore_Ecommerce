import { createSlice } from "@reduxjs/toolkit";

const ProductSliceOld = createSlice({
  name: "Product_Slice",
  initialState: [],
  reducers: {
    addProduct(state, action) {},
  },
});

export const { addProduct } = ProductSliceOld.actions;

export default ProductSliceOld.reducer;
