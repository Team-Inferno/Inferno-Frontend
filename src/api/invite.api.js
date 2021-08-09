import axios from "axios";

const sendInvitation = (data) => {
  //console.log(data);
  return axios.post(process.env.REACT_APP_SERVER + "invite/send", null, {
    params: {
      server_id: data.serverID,
      sender_id: data.senderID,
      username: data.username,
    },
  });
};

const acceptInvitation = (data) => {
  //console.log(data);
  return axios.post(process.env.REACT_APP_SERVER + "invite/accept", null, {
    params: {
      invite_id: data.inviteID,
      user_id: data.userID,
    },
  });
};

const declineInvitation = (data) => {
  //console.log(data);
  return axios.post(process.env.REACT_APP_SERVER + "invite/decline", null, {
    params: {
      invite_id: data.inviteID,
      user_id: data.userID,
    },
  });
};

export { declineInvitation, acceptInvitation, sendInvitation };