import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./redux/user.slice";
import errorReducer from "./redux/error.slice";
import serverReducer from "./redux/server.slice";
import channelReducer from "./redux/channel.slice";
import reducers from './redux';

export default configureStore({
  reducer: {
    userReducer,
    errorReducer,
    serverReducer,
    channelReducer,
  },
});
