import { createSlice } from "@reduxjs/toolkit";

export const channelSlice = createSlice({
  name: "channel",
  initialState: {
    currentTextChannel: null,
    currentVoiceChannel: null,
  },
  reducers: {
    setCurrentTextChannel: (state, action) => {
      state.currentTextChannel = action.payload;
    },
    setCurrentVoiceChannel: (state, action) => {
      state.currentVoiceChannel = action.payload;
    },
  },
});

export const { setCurrentTextChannel, setCurrentVoiceChannel } =
  channelSlice.actions;

export default channelSlice.reducer;
