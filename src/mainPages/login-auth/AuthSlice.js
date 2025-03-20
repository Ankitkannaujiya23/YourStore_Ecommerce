import { createSlice } from "@reduxjs/toolkit";
const initialState={
  user:null,
  isLoggedIn:false
}
const AuthSlice = createSlice({
  name: "auth_Slice",
  initialState,
  reducers: {
    setUser: (state,action) => {
      state.user=action.payload;
      localStorage.setItem('token', action.payload?.token);
      state.isLoggedIn=true;
    },
    logoutUser: (state,action) => {
      localStorage.removeItem('token');
      return initialState;
    },
  },
});

export const { setUser, logoutUser } = AuthSlice.actions;

export default AuthSlice.reducer;
