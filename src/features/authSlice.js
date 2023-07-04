import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  authIsReady: false,
  currentSessionId: null,
  socketId: null,
  serverSideError: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setSocketId: (state, action) => {
      state.socketId = action.payload;
    },
    setAuthIsReady: (state, action) => {
      state.authIsReady = true;
      state.user = action.payload?.user;
      state.currentSessionId = action.payload?.currentSessionId;
    },
    setServerError: (state, action) => {
      state.serverSideError = action.payload;
      state.user = null;
      state.authIsReady = true;
    },
  },
});

export const { setUser, setSocketId, setAuthIsReady, setServerError } =
  authSlice.actions;

export default authSlice.reducer;
