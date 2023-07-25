import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  alert: null,
};

const alertSlice = createSlice({
  name: "alert",
  initialState,
  reducers: {
    setError: (state, action) => {
      state.alert = { message: action.payload, type: "ERROR" };
    },
    setSuccess: (state, action) => {
      state.alert = { message: action.payload, type: "SUCCESS" };
    },
    reset: (state) => {
      state.alert = null;
    },
  },
});

export const { setError, setSuccess, reset } = alertSlice.actions;

export default alertSlice.reducer;
