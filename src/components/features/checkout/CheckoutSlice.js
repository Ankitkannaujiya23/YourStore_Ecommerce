import { createSlice } from "@reduxjs/toolkit";

const CheckoutSlice=createSlice({
    name:"Checkout_Sl",
    initialState:{
       AddressDetails:[]
    },
    reducers:{
        addAddressDetails(state,action){
            state.AddressDetails=[...state.AddressDetails, action.payload];
        },
        removeAddressDetails(state, action){
        //state.AddressDetails= state.AddressDetails.filter()
        },
        updateAddressDetails(state,action){

        }
    }
});

export const{addAddressDetails, removeAddressDetails, updateAddressDetails}=CheckoutSlice.actions;

export default CheckoutSlice.reducer;
