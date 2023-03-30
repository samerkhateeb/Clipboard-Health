import { createListenerMiddleware } from "@reduxjs/toolkit";
import { rChangeEmpID, rToggleChangeAction } from "./Agents/agentSlice";

const listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening({
  actionCreator: rToggleChangeAction,
  effect: async (action, listenerApi) => {
    listenerApi.dispatch(rChangeEmpID(action.payload));
  },
});

export default listenerMiddleware;
