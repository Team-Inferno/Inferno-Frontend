import React, { useEffect, useState } from "react";
import TextIcon from "@material-ui/icons/ChatBubbleOutline";
import Message from "./Message/message";
import MessageForm from "./MessageForm/messageform";
import { useSelector, useDispatch } from "react-redux";

const Chat = (props) => {
  const [messageList, setMessageList] = useState([]);

  const textChannel = useSelector((state) => {
    return state.channelReducer.currentTextChannel;
  });

  useEffect(() => {}, []);

  return (
    <div id="chat">
      <section className="chat-header">
        <div className="chat-channel-name">
          <TextIcon fontSize="default" className="text-channel-icon" />
          <p>General</p>
        </div>
      </section>
      <section className="messages">
        {messageList.map((message) => {
          return (
            <li key={message._id}>
              <Message props={message} />
            </li>
          );
        })}
      </section>
      <section className="send-message-section">
        <MessageForm />
      </section>
    </div>
  );
};

export default Chat;
