import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    lat: 0,
    lon: 0,
    cravings: [],
  },
  reducers: {
    setLat: (state, action) => {
      state.lat = action.payload;
    },
    setLon: (state, action) => {
      state.lon = action.payload;
    },
    addCraving: (state, action) => {
      state.cravings.push(action.payload);
    },
    removeCraving: (state, action) => {
      console.log("hat is this", action.payload);
      const idx = state.cravings.indexOf(action.payload);
      state.cravings.splice(idx, 1);
      //   state.cravings.filter((craving) => craving !== action.payload);
    },
  },
});

export const { setLat, setLon, addCraving, removeCraving } = userSlice.actions;

export default userSlice.reducer;
