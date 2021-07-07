import React, { useState, useEffect } from "react";
import Message from "./Message/message";

const MessageList = (props) => {
  const [messageList, setMessageList] = useState(props.messageList);

  console.log(messageList);

  useEffect(() => {
    setMessageList(props.messageList);
  }, [props.messageList]);

  return (
    <div>
      <section className="messages">
        {messageList.map((message) => {
          return (
            <li key={message._id}>
              <Message message={message} />
            </li>
          );
        })}
      </section>
    </div>
  );
};

export default MessageList;
