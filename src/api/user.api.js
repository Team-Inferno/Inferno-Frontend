import axios from "axios";


const getUserProfile = async (userID) => {
  const res = await axios.get(
    process.env.REACT_APP_SERVER + "user/profile",
    {
      params: {
        user_id: userID,
      },
    }
  );
  return res.data;
};

const getUserInvites = async (userID) => {
  const res = await axios.get(
    process.env.REACT_APP_SERVER + "user/invites",
    {
      params: {
        user_id: userID,
      },
    }
  );
  return res.data;
};


const setPeer = (data) => {
  return axios.post(process.env.REACT_APP_SERVER + "user/peer", null, {
    params: {
      user_id: data.userID,
      peer_id: data.peerID
    },
  });
};

const getUserName = async (userID) => {
  //console.log(userID);
  const res = await axios.get(
    process.env.REACT_APP_SERVER + "user/name",
    {
      params: { user_id: userID },
    }
  );
  //console.log(res);
  return res.data;
}

const setUserName = (data) => {
  return axios.post(process.env.REACT_APP_SERVER + "user/name", null, {
    params: {
      user_name: data.userName,
      user_id: data.userID,
    },
  });
};

const isStreamer = async (userID) => {
  const res = await axios.get(process.env.REACT_APP_SERVER + "user/streamer", {
    params: { user_id: userID },
  });

  return res.data;
};



export {
  getUserProfile,
  getUserInvites,
  getUserName,
  setPeer,
  setUserName,
  isStreamer,
};
