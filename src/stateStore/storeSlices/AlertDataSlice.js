import {createSlice} from '@reduxjs/toolkit';
const AlertData={
    isShowAlert:false,
    isSuccess:false,
    message:"",
    timer:0
};

const  AlertDataSlice= createSlice({
    name:"AlertSlice",
    initialState:AlertData,
    reducers:{
        showAlert(state,action){
            state=action.payload;
        },
        hideAlert(state,action){
            state={isSuccess:false, message:"", timer:0, isShowAlert:false}
        }
    }
});

export const{showAlert, hideAlert}= AlertDataSlice.actions;
export default AlertDataSlice.reducer;