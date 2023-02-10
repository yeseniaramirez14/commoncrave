import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import homeReducer from "./homeSlice";
import cravingsModalSlice from "./cravingsModalSlice";

export default configureStore({
  reducer: {
    home: homeReducer,
    user: userReducer,
    cravingsModal: cravingsModalSlice,
  },
});
