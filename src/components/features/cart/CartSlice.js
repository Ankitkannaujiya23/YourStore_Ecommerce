import { createSlice } from '@reduxjs/toolkit';

const CartSlice = createSlice({
    name: "Cart_Slice",
    initialState: {
        cartItems: []
    },
    reducers: {
        addItemIntoCart(state, action) {
            const existingItem = state.cartItems.find(item => item.id === action.payload.id);
            if (existingItem) {
                existingItem.quantity += action.payload.quantity;
            } else {
                state.cartItems.push(action.payload);
            }
        },
        removeItemFromCart(state, action) {
            state.cartItems = state.cartItems.filter(item => item.id != action.payload);
            // let index = state.cartItems.findIndex(row => row.id == action.payload.id);
            // state.cartItems.splice(index, 1);
        },
        updateQuantity(state, action) {
            let product = state.cartItems.find(row => row.id == action.payload.id);
            if (product) product.quantity = action.payload.quantity;
        },
        setCartItemsFromBackend(state, action) {
            state.cartItems = action.payload;
        },
        clearCart(state, action) {
            state.cartItems = [];
        }
    }
});

export const { addItemIntoCart, removeItemFromCart, updateQuantity, clearCart } = CartSlice.actions;
export default CartSlice.reducer;