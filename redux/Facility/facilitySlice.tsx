import { createSlice, EntityState, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  client: { toggleForm: false, id: undefined, deleteId: undefined },
};
export const facilityReducerKey = "facilities";

const facilitySlice = createSlice({
  name: facilityReducerKey,
  initialState,
  reducers: {
    toggleChangeAction: (state, action) => {
      state.client.toggleForm = !state.client.toggleForm;
    },
    changeFacilityID: (state, action) => {
      state.client.id = action.payload;
    },
    deleteFacility: (state, action) => {
      state.client.deleteId = action.payload;
    },
  },
});

export const { deleteFacility, changeFacilityID, toggleChangeAction } =
  facilitySlice.actions;

export default facilitySlice.reducer;
