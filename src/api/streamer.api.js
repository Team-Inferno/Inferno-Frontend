import axios from "axios";

const registerStreamer = (data) => {
  return axios.post(process.env.REACT_APP_SERVER + "stream/register", null, {
    params: {
      user_id: data.userID,
    },
  });
};

const followStreamer = (data) => {
  return axios.post(process.env.REACT_APP_SERVER + "stream/follow", null, {
    params: {
      user_id: data.userID,
      streamer_id: data.streamerID,
    },
  });
};

const getStreamerProfile = async (streamerID) => {
  const res = await axios.get(
    process.env.REACT_APP_SERVER + "stream/profile",
    {
      params: {
        streamer_id: streamerID,
      },
    }
  );
  return res.data;
};

const getStreamerSearch = async (query) => {
  const res = await axios.get(
    process.env.REACT_APP_SERVER + "stream/search",
    {
      params: {
        streamer_query: query,
      },
    }
  );
  return res.data;
};

const isFollowing = async (data) => {
  const res = await axios.get(
    process.env.REACT_APP_SERVER + "stream/following",
    {
      params: {
        streamer_id: data.streamerID,
        user_id: data.userID,
      },
    }
  );
  return res.data;
};


const isStreaming = async (id) => {
  const res = await axios.get(
    process.env.REACT_APP_SERVER + "stream/current",
    {
      params: {
        streamer_id: id,
      },
    }
  );
  return res.data;
};

const setStreamKey = async (data) => {
  return axios.post(process.env.REACT_APP_SERVER + "stream/key", null, {
    params: {
      streamer_id: data.streamerID,
      stream_key: data.streamKey
    },
  });
};

const stopStreaming = async (data) => {
  return axios.post(process.env.REACT_APP_SERVER + "stream/stop", null, {
    params: {
      streamer_id: data.streamerID,
    },
  });
};

export {
  registerStreamer,
  getStreamerProfile,
  getStreamerSearch,
  isFollowing,
  followStreamer,
  isStreaming,
  setStreamKey,
  stopStreaming,
};
