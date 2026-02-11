import { createSlice } from '@reduxjs/toolkit';

const CartSlice = createSlice({
    name: "Cart_Slice",
    initialState: {
        cartItems: []
    },
    reducers: {
        addItemIntoCart(state, action) {
            const existingItem = state.cartItems.find(item => item.product_id === action.payload.product_id);
            if (existingItem) {
                existingItem.quantity += action.payload.quantity;
            } else {
                state.cartItems.push(action.payload);
            }
        },
        removeItemFromCart(state, action) {
            state.cartItems = state.cartItems.filter(item => item.product_id != action.payload);
            // let index = state.cartItems.findIndex(row => row.id == action.payload.id);
            // state.cartItems.splice(index, 1);
        },
        updateQuantity(state, action) {
            let product = state.cartItems.find(row => row.product_id == action.payload.product_id);
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

export const { addItemIntoCart, removeItemFromCart, updateQuantity, clearCart, setCartItemsFromBackend } = CartSlice.actions;
export default CartSlice.reducer;