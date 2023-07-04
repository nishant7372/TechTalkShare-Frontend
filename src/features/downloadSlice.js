import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  activeDownloads: [],
};

const downloadSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setActiveDownloads: (state, action) => {
      state.activeDownloads = action.payload;
    },
  },
});

export const { setActiveDownloads } = downloadSlice.actions;

export default downloadSlice.reducer;
