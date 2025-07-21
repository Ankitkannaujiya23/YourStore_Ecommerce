import { createSlice } from '@reduxjs/toolkit';

const CartSlice = createSlice({
    name: "Cart_Slice",
    initialState: {
        cartItems: []
    },
    reducers: {
        addItemIntoCart(state, action) {
            const existingItem = state.cartItems.find(item => item.productId === action.payload.productId);
            if (existingItem) {
                existing.quantity += action.payload.quantity;
            } else {
                state.items.push(action.payload);
            }
        },
        removeItemFromCart(state, action) {
            //state.cart= state.cart.filter(item=> item.id !=action.payload);
            let index = state.cartItems.findIndex(row => row.id == action.payload.id);
            state.cartItems.splice(index, 1);
        },
        updateItemIntoCart(state, action) {
            let index = state.cartItems.findIndex(row => row.id == action.payload.id);
            state.cartItems[index] = action.payload;
        }
    }
});

export const { addItemIntoCart, removeItemFromCart, updateItemIntoCart } = CartSlice.actions;
export default CartSlice.reducer;