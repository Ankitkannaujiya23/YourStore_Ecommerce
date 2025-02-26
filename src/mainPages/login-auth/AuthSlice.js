import { createSlice } from "@reduxjs/toolkit";

const AuthSlice = createSlice({
  name: "auth_Slice",
  initialState: {},
  reducers: {
    setUser: () => {},
    logoutUser: () => {},
  },
});

export const { setUser, logoutUser } = AuthSlice.actions;

export default AuthSlice.reducer;
