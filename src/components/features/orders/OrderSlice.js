import {createSlice} from'@reduxjs/toolkit';

const OrderSlice=createSlice({
    name:'Order_Sl',
    initialState:{
        orders:[],
        currentOrderPlaced:null
    },
    reducers:{
        addOrder(state, action){
            state.orders=[...state.orders, action.payload];
            state.currentOrderPlaced=action.payload;
            console.log("orders",state.orders);
        },
        updateOrder(state,action){

        },
        removeOrder(state, action){

        }
    }
});

export const{addOrder, updateOrder, removeOrder}=OrderSlice.actions;

export default OrderSlice.reducer;