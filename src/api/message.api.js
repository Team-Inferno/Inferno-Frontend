import axios from "axios";

const getConversation = (channelID) => {
  return axios.get(
    process.env.REACT_APP_SERVER + "conversation",
    {
      params: {
        channel_id: channelID,
      },
    }
  );
};

const sendMessage = (data) => {
    return axios.post(
      process.env.REACT_APP_SERVER + "conversation",
      null,
      {
        params: {
          content: data.message,
          sender: data.sender,
          channel_id: data.channelID,
          sender_name: data.senderName,
        },
      }
    );
}

export {getConversation,sendMessage};
                                             