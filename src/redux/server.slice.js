import { createSlice } from "@reduxjs/toolkit";

export const serverSlice = createSlice({
  name: "server",
  initialState: {
    subscribedServers: [],
    currentServerID: null,
    currentServer: null,
  },
  reducers: {
    setServerList: (state, action) => {
      state.subscribedServers = action.payload;
    },
    setCurrentServerID: (state, action) => {
      state.currentServerID = action.payload;
    },
    setCurrentServer: (state, action) => {
      state.currentServer = action.payload;
    },
  },
});

export const { setServerList, setCurrentServerID, setCurrentServer } =
  serverSlice.actions;

export default serverSlice.reducer;
