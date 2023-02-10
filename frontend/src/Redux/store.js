import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import homeReducer from "./homeSlice";

export default configureStore({
  reducer: {
    home: homeReducer,
    user: userReducer,
  },
});
