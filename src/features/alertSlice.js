import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  error: null,
  success: null,
};

const alertSlice = createSlice({
  name: "alert",
  initialState,
  reducers: {
    setError: (state, action) => {
      state.error = action.payload;
    },
    setSuccess: (state, action) => {
      state.success = action.payload;
    },
    reset: (state) => {
      state.error = null;
      state.success = null;
    },
  },
});

export const { setError, setSuccess, reset } = alertSlice.actions;

export default alertSlice.reducer;
