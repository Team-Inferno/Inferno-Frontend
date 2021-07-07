import React from "react";

const Message = (props) => {
  return (
    <div className="message">
      <div className="owner-img"></div>
      <div className="message-details">
        <div className="owner-name">{props.message.sender_name}</div>
        <div className="message-date">{props.message.updatedAt}</div>
        <div className="message-body">
        {props.message.content}
        </div>
      </div>
    </div>
  );
};

export default Message;
