import axios from "axios";

const getConversation = (channelID) => {
  return axios.get("http://localhost:8080/api/conversation/", {
    params: {
      channel_id: channelID,
    },
  });
};

const sendMessage = (data) => {
    return axios.post("http://localhost:8080/api/conversation/", null, {
      params: {
        content: data.message,
        sender: data.sender,
        channel_id: data.channelID,
        sender_name: data.senderName,
      },
    });
}

export {getConversation,sendMessage};
                                             