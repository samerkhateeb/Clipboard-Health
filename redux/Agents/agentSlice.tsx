import { createSlice, EntityState, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  client: { toggleForm: false, id: undefined, deleteId: undefined },
};
export const agentReducerKey = "agents";

const agentSlice = createSlice({
  name: agentReducerKey,
  initialState,
  reducers: {
    rToggleChangeAction: (state, action) => {
      state.client.toggleForm = !state.client.toggleForm;
    },
    rChangeEmpID: (state, action) => {
      state.client.id = action.payload;
    },
    rDeleteAgent: (state, action) => {
      state.client.deleteId = action.payload;
    },
  },
});

export const { rToggleChangeAction, rChangeEmpID, rDeleteAgent } =
  agentSlice.actions;

export default agentSlice.reducer;
