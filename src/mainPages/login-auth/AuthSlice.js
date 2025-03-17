import { createSlice } from "@reduxjs/toolkit";
const initialState={
  user:null
}
const AuthSlice = createSlice({
  name: "auth_Slice",
  initialState,
  reducers: {
    setUser: (state,action) => {
      state.user=action.payload;
    },
    logoutUser: (state,action) => {
      localStorage.removeItem('token');
      return initialState;
    },
  },
});

export const { setUser, logoutUser } = AuthSlice.actions;

export default AuthSlice.reducer;
