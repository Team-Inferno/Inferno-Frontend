import axios from "axios";

const getUserProfile = async (userID) => {
  const res = await axios.get("http://localhost:8080/api/user/profile", {
    params: {
      user_id: userID,
    },
  });
  return res.data;
};

const getUserInvites = async (userID) => {
  const res = await axios.get("http://localhost:8080/api/user/invites", {
    params: {
      user_id: userID,
    },
  });
  return res.data;
};

const sendInvitation  = (data) => {
  //console.log(data);
  return axios.post("http://localhost:8080/api/invite/send", null, {
    params: {
      server_id: data.serverID,
      sender_id: data.senderID,
      username: data.username
    },
  });
}

const acceptInvitation = (data) => {
  //console.log(data);
  return axios.post("http://localhost:8080/api/invite/accept", null, {
    params: {
      invite_id: data.inviteID,
      user_id: data.userID,
    },
  });
}

const declineInvitation = (data) => {
  //console.log(data);
  return axios.post("http://localhost:8080/api/invite/decline", null, {
    params: {
      invite_id: data.inviteID,
      user_id: data.userID,
    },
  });
};

const getUserName = async (userID) => {
  //console.log(userID);
  const res = await axios.get("http://localhost:8080/api/user/name",{
    params: { user_id: userID },
  });
  //console.log(res);
  return res.data;
}

export {
  getUserProfile,
  getUserInvites,
  sendInvitation,
  getUserName,
  acceptInvitation,
  declineInvitation,
};
