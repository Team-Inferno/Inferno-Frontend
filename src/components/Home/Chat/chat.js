import React from "react";
import TextIcon from "@material-ui/icons/ChatBubbleOutline";
import Message from "./Message/message";
import MessageForm from "./MessageForm/messageform";
const Chat = (props) => {
  return (
    <div className="chat">
      <section className="chat-header">
        <div className="chat-channel-name">
          <TextIcon fontSize="default" className="text-channel-icon" />
          <p>General</p>
        </div>
      </section>
      <section className="messages">
        <Message/>
        <Message/>
        <Message/>
        <Message/>
      </section>
      <section className="send-message-section">
          <MessageForm/>
      </section>
    </div>
  );
};

export default Chat;
