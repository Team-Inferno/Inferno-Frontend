import axios from "axios";

const addChannel = (data) => {
  return axios.post(
    process.env.REACT_APP_SERVER + "channel",
    null,
    {
      params: {
        server_id: data.serverID,
        room_id: data.roomID,
        channel_name: data.channelName,
        channel_type: data.channelType,
      },
    }
  );
};

const renameChannel = (data) => {
  return axios.post(
    process.env.REACT_APP_SERVER + "channel/rename",
    null,
    {
      params: {
        channel_name: data.channelName,
        server_id: data.serverID,
        room_id: data.roomID,
        channel_id: data.channelID,
      },
    }
  );
};

const deleteChannel = (data) => {
  return axios.post(
    process.env.REACT_APP_SERVER + "channel/delete",
    null,
    {
      params: {
        server_id: data.serverID,
        room_id: data.roomID,
        channel_id: data.channelID,
      },
    }
  );
};

const joinVoiceChannel = (data) => {
  return axios.post(
    process.env.REACT_APP_SERVER +
      "channel/voice/join",
    null,
    {
      params: {
        server_id: data.serverID,
        room_id: data.roomID,
        channel_id: data.channelID,
        user_id: data.userID,
      },
    }
  );
}

const leaveVoiceChannel = (data) => {
  return axios.post(
    process.env.REACT_APP_SERVER +
      "channel/voice/leave",
    null,
    {
      params: {
        server_id: data.serverID,
        room_id: data.roomID,
        channel_id: data.channelID,
        user_id: data.userID,
      },
    }
  );
};

export {
  addChannel,
  renameChannel,
  deleteChannel,
  joinVoiceChannel,
  leaveVoiceChannel,
};
