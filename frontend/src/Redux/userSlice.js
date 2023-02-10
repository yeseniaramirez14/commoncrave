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
    setCravings: (state, action) => {
      state.cravings = action.payload;
    },
    addCraving: (state, action) => {
      if (action.payload.length === 0) {
        // pass
      } else {
        for (let craving of action.payload) {
          console.log("what is the craving", craving);
          state.cravings.push(craving);
        }
      }
    },
    removeCraving: (state, action) => {
      const idx = state.cravings.indexOf(action.payload);
      state.cravings.splice(idx, 1);
      //   state.cravings.filter((craving) => craving !== action.payload);
    },
  },
});

export const { setLat, setLon, setCravings, addCraving, removeCraving } =
  userSlice.actions;

export default userSlice.reducer;
