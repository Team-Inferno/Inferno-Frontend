import React from 'react'
import SendIcon from "@material-ui/icons/Send";
import "../css/home.css"
const MessageForm = (props) => {
  return (
    <div className="send-message-form">
      <form>
        <input type="text" placeholder="Message#General" />
        <button id="message-submit-button" type="button">
          <SendIcon fontSize="small" />
        </button>
      </form>
    </div>
  );

 }

export default MessageForm;