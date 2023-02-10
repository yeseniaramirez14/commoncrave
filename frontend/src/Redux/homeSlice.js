import { createSlice } from "@reduxjs/toolkit";

export const homeSlice = createSlice({
  name: "home",
  initialState: {
    isNewGroup: null,
  },
  reducers: {
    setIsNewGroupTrue: (state) => {
      state.isNewGroup = true;
    },
    setIsNewGroupFalse: (state) => {
      state.isNewGroup = false;
    },
  },
});

export const { setIsNewGroupTrue, setIsNewGroupFalse } = homeSlice.actions;

export default homeSlice.reducer;
