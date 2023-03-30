import { createSlice, EntityState, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  client: { toggleForm: false, id: undefined, deleteId: undefined },
};
export const shiftReducerKey = "shifts";

const shiftSlice = createSlice({
  name: shiftReducerKey,
  initialState,
  reducers: {
    toggleChangeAction: (state, action) => {
      state.client.toggleForm = !state.client.toggleForm;
    },
    changeShiftID: (state, action) => {
      state.client.id = action.payload;
    },
    deleteShift: (state, action) => {
      state.client.deleteId = action.payload;
    },
  },
});

export const { deleteShift, changeShiftID, toggleChangeAction } =
  shiftSlice.actions;

export default shiftSlice.reducer;
