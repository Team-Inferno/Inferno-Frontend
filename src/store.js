import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./redux/user.slice";
import errorReducer from "./redux/error.slice";
import serverReducer from "./redux/server.slice";
import channelReducer from "./redux/channel.slice";

export default configureStore({
  reducer: {
    userReducer,
    errorReducer,
    serverReducer,
    channelReducer,
  },
});
