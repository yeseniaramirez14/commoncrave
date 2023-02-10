import { createSlice } from "@reduxjs/toolkit";

export const cravingsModalSlice = createSlice({
  name: "cravingsModal",
  initialState: {
    modalCravings: [],
    checkboxStates: {},
  },
  reducers: {
    addModalCraving: (state, action) => {
      state.modalCravings.push(action.payload);
    },
    removeModalCraving: (state, action) => {
      const idx = state.modalCravings.indexOf(action.payload);
      state.modalCravings.splice(idx, 1);
    },
    clearModalCravings: (state) => {
      state.modalCravings = [];
    },
    setModalCravings: (state, action) => {
      state.modalCravings = action.payload;
    },
    editCheckboxStates: (state, action) => {
      state.checkboxStates[action.payload] =
        !state.checkboxStates[action.payload];
    },
    removeCravingFromCheckboxStates: (state, action) => {
      state.checkboxStates = {};
      if (action.payload.length === 0) {
        //pass
      } else {
        for (let craving of action.payload) {
          state.checkboxStates[craving] = true;
        }
      }
    },
  },
});

export const {
  addModalCraving,
  removeModalCraving,
  clearModalCravings,
  setModalCravings,
  editCheckboxStates,
  removeCravingFromCheckboxStates,
} = cravingsModalSlice.actions;

export default cravingsModalSlice.reducer;
