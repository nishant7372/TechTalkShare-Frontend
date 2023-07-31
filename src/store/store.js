import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./../features/authSlice";
import alertReducer from "./../features/alertSlice";
import articleReducer from "./../features/articleSlice";
import sharingReducer from "./../features/sharingSlice";
import downloadReducer from "./../features/downloadSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    alert: alertReducer,
    article: articleReducer,
    sharing: sharingReducer,
    download: downloadReducer,
  },
});

export default store;
