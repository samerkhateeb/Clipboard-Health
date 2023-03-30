import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import listenerMiddleware from "./listener";
import agentSlice, { agentReducerKey } from "./Agents/agentSlice";
import facilitySlice, { facilityReducerKey } from "./Facility/facilitySlice";
import shiftSlice, { shiftReducerKey } from "./Shift/shiftSlice";

export const store = configureStore({
  reducer: {
    [agentReducerKey]: agentSlice,
    [facilityReducerKey]: facilitySlice,
    [shiftReducerKey]: shiftSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(listenerMiddleware.middleware),
});
