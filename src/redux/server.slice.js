import { createSlice } from "@reduxjs/toolkit";
const isEmpty = require("is-empty");

export const serverSlice = createSlice({
  name: "server",
  initialState: {
    currentServer: null,
    subscribedServers: []
  },
  reducers: {
    setServer: (state, action) => {
      state.email = action.payload.email;
      state.uid = action.payload.uid;
      state.isLoggedIn = !isEmpty(action.payload);
      state.username = action.payload.username;
      state.servers = action.payload.servers;

      state.currentServer = action.payload.server;
      state.subscribedServers = action.payload.servers;
    },
  },
});

export const { setServer } = serverSlice.actions;

export default serverSlice.reducer;
