import React, { useState, useRef, useEffect, useContext } from "react";
import { useQuery } from "react-query";
import { getConversation } from "../../api/message.api";
import Message from "./Message";
import Loader from "react-loader-spinner";
import {SocketContext} from "../../context/socket";

const MessageList = (props) => {

  const [messageList, setMessageList] = useState([]);

  const scrollRef = useRef();
  const socket = useContext(SocketContext);

  const conversationQuery = useQuery(
    ["conversation", props.channelID],
    () => {
      return getConversation(props.channelID);
    },
    { refetchOnWindowFocus: false }
  );

  const newMessageHandler = (message) => {
    setMessageList((messageList) => [...messageList, message]);
  }

  useEffect(() => {
    setMessageList(conversationQuery.data?.data);
  }, [conversationQuery.data]);

  useEffect(() => {
    socket.emit("text-message", props.channelID);
    socket.on("new-conversation", (message) => {
      newMessageHandler(message); 
    });
    return () => {
      socket.off("new-conversation", (message) => {
        newMessageHandler(message);
      });
    };
  }, [socket, props.channelID]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messageList]);

  if (conversationQuery.isLoading || conversationQuery.isFetching) {
    <div id="chat">
      {props.ChatHeader}
      <div className="loading-screen">
        <Loader type="TailSpin" color="#00BFFF" height={40} width={40} />
      </div>
    </div>;
  }

  if (conversationQuery.error) {
    <>
      <div id="chat">
        {props.ChatHeader}
        <div className="no-channel">
          <p>Error Loading Messages</p>
        </div>
      </div>
    </>;
  }

  return (
    <>
      <ul>
        {messageList?.map((message) => {
          return (
            <li key={message._id}>
              <Message message={message} />
            </li>
          );
        })}
        <div ref={scrollRef} />
      </ul>
    </>
  );
};

export default MessageList;
