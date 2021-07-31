import { configureStore } from "@reduxjs/toolkit";
import errorReducer from "./redux/error.slice";
import channelReducer from "./redux/channel.slice";
import modalReducer from "./redux/modal.slice";

export default configureStore({
  reducer: {
    errorReducer,
    channelReducer,
    modalReducer,
  },
});
