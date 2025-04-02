import { createSlice } from "@reduxjs/toolkit";
const initialState={
  user:{},
  isLoggedIn:false
}
const AuthSlice = createSlice({
  name: "auth_Slice",
  initialState,
  reducers: {
    setUser: (state,action) => {
      console.log({action})
      state.user=action.payload;
      state.isLoggedIn=true;
      //return {...state, user:action.payload, isLoggedIn:true};
    },
    logoutUser: (state,action) => {
      return initialState;
    },
  },
});

export const { setUser, logoutUser } = AuthSlice.actions;

export default AuthSlice.reducer;
