import React, { useState } from "react";
import { useMutation } from "react-query";
import { sendMessage } from "../../api/message.api";

const MessageForm = (props) => {
  const [message, setMessage] = useState("");

  const { mutate, isLoading, error } = useMutation(
    (data) => sendMessage(data),
    {
      onSuccess: (res) => {},
    }
  );
  const submitForm = (e) => {
    e.preventDefault();
    if (message.length > 0) {
      mutate({
        message: message,
        sender: props.userID,
        channelID: props.channelID,
        senderName: props.userName,
      });

      setMessage("");
    }
  };
  return (
    <div className="send-message-form">
      <form onSubmit={(e) => submitForm(e)}>
        <input
          type="text"
          placeholder={`Message#${props.channelName}`}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </form>
    </div>
  );
};

export default MessageForm;
