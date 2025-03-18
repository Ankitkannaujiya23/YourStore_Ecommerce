import { createSlice } from "@reduxjs/toolkit";

const ProductSlice = createSlice({
  name: "Product_Slice",
  initialState: {
    selectedProduct: null,
    productList:[],
  },
  reducers: {
    setSelectedProduct: (state, action) => {
      state.selectedProduct = action.payload;
    },
    setProductList:(state,action)=>{
      state.productList=action.payload;
    }
  },
});

export const { setSelectedProduct,setProductList } = ProductSlice.actions;
export default ProductSlice.reducer;
