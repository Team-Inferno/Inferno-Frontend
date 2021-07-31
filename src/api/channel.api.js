import axios from "axios";

const addChannel = (data) => {
  return axios.post("http://localhost:8080/api/server/new/channel", null, {
    params: {
      server_id: data.serverID,
      room_id: data.roomID,
      channel_name: data.channelName,
      channel_type: data.channelType,
    },
  });
};

const renameChannel = (data) => {
  return axios.post("http://localhost:8080/api/server/rename/channel", null, {
    params: {
      channel_name: data.channelName,
      server_id: data.serverID,
      room_id: data.roomID,
      channel_id: data.channelID,
    },
  });
};

const deleteChannel = (data) => {
  return axios.post("http://localhost:8080/api/server/delete/channel", null, {
    params: {
      server_id: data.serverID,
      room_id: data.roomID,
      channel_id: data.channelID,
    },
  });
};

export { addChannel, renameChannel, deleteChannel };
