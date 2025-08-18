import { createSlice } from "@reduxjs/toolkit";

const AddressSlice = createSlice({
    name: "Address_Slice",
    initialState: {
        AddressList: ["hi"]
    },
    reducers: {
        setAddress: (state, action) => {
            state.AddressList = action.payload;
        },
        addAddress: (state, action) => {
            state.AddressList.push(action.payload);
        },
        updateAddress: (state, action) => {
            const index = state.AddressList.findIndex(item => item.id === action.payload.id);
            if (index !== -1) {
                state.AddressList[index] = action.payload;
            }
        },
        removeAddress: (state, action) => {
            state.AddressList = state.AddressList.filter(item => item.id !== action.payload);
        }
    }

});

export const { setAddress, addAddress, updateAddress, removeAddress } = AddressSlice.actions;

export default AddressSlice.reducer;