import { createSlice } from "@reduxjs/toolkit";

const UserSlice=createSlice({
    name:"User_Slice",
    initialState:{
        userInformation:null,
        isLoggedIn:false
    },
    reducers:{
        setUser(state, action){
            state.userInformation=action.payload;
            state.isLoggedIn=true
        },
        logoutUser(state,action){
            state.userInformation=null;
            state.isLoggedIn=false;
        }
    }
});

export const{setUser,logoutUser}=UserSlice.actions;
export default UserSlice.reducer;
