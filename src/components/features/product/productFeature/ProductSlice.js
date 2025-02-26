import { createSlice } from "@reduxjs/toolkit";

const ProductSlice = createSlice({
  name: "Product_Slice",
  initialState: {
    selectedProduct: null,
  },
  reducers: {
    setSelectedProduct: (state, action) => {
      state.selectedProduct = action.payload;
    },
  },
});

export const { setSelectedProduct } = ProductSlice.actions;
export default ProductSlice.reducer;
