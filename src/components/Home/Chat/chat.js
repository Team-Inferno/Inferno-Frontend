import React, { useEffect, useState } from "react";
import TextIcon from "@material-ui/icons/ChatBubbleOutline";
import MessageForm from "./MessageForm/messageform";
import { useSelector } from "react-redux";
import io from "socket.io-client";
import Message from "./Message/message";
const axios = require("axios");

const Chat = (props) => {
  const [messageList, setMessageList] = useState([]);

  const textChannel = useSelector((state) => {
    return state.channelReducer.currentTextChannel;
  });

  useEffect(() => {
    if (textChannel) {
      const socket = io(`http://localhost:9090`);
      socket.emit("text-message", textChannel._id);

      socket.on("new-conversation", (conversation) => {
        setMessageList((messageList) => [...messageList, conversation]);
      });

      axios
        .get("http://localhost:8080/api/conversation/", {
          params: {
            channel_id: textChannel._id,
          },
        })
        .then((res) => {
          setMessageList([...res.data]);
        })
        .catch((error) => {
          if (error.response) {
            console.log(error.response);
          }
        });
    }
  }, [textChannel]);

  if (textChannel) {
    console.log(messageList);
    return (
      <div id="chat">
        <section className="chat-header">
          <div className="chat-channel-name">
            <TextIcon fontSize="default" className="text-channel-icon" />
            <p>{textChannel.channel_name}</p>
          </div>
        </section>

        <section className="messages">
          <ul>
            {messageList && messageList.map((message) => {
              return (
                <li key={message._id}>
                  <Message message={message} />
                </li>
              );
            })}
          </ul>
        </section>

        <section className="send-message-section">
          <MessageForm />
        </section>
      </div>
    );
  } else {
    return (
      <>
        <div id="chat">
          <div className="no-channel">
            <p>Select a text channel to start conversation</p>
          </div>
        </div>
      </>
    );
  }
};

export default Chat;
