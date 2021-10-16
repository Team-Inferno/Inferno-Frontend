import { createSlice } from "@reduxjs/toolkit";

export const modalSlice = createSlice({
  name: "modal",
  initialState: {
    addServerModal: false,
    addChannelModal: { visible: false, room: null },
    renameRoomModal: false,
    renameChannelModal: false,
    addRoomModal: false,
    inviteModal: false,
    createStreamModal: false,
  },
  reducers: {
    setAddServerModal: (state, action) => {
      state.addServerModal = action.payload;
    },
    setAddRoomModal: (state, action) => {
      state.addRoomModal = action.payload;
    },
    setAddChannelModal: (state, action) => {
      state.addChannelModal.visible = action.payload.visible;
      state.addChannelModal.room = action.payload.room;
    },
    setRenameRoomModal: (state, action) => {
      state.renameRoomModal = action.payload;
    },
    setRenameChannelModal: (state, action) => {
      state.renameChannelModal = action.payload;
    },
    setInviteModal: (state, action) => {
      state.inviteModal = action.payload;
    },
    setCreateStreamModal: (state, action) => {
      state.createStreamModal = action.payload;
    },
  },
});

export const {
  setAddServerModal,
  setAddChannelModal,
  setRenameRoomModal,
  setRenameChannelModal,
  setAddRoomModal,
  setInviteModal,
  setCreateStreamModal,
} = modalSlice.actions;

export default modalSlice.reducer;
