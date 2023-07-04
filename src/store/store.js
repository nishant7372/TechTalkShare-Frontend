import { configureStore } from "@reduxjs/toolkit";

import articleReducer from "./../features/articleSlice";
import sharingReducer from "./../features/sharingSlice";
import alertReducer from "./../features/alertSlice";
import authReducer from "./../features/authSlice";
import downloadReducer from "./../features/downloadSlice";

const store = configureStore({
  reducer: {
    article: articleReducer,
    sharing: sharingReducer,
    alert: alertReducer,
    auth: authReducer,
    download: downloadReducer,
  },
});

export default store;
