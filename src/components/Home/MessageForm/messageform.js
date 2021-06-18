import React from 'react'
import SendIcon from "@material-ui/icons/Send";
import "../css/home.css"
const MessageForm = (props) => {
  return (
      <form>
        <div className="form-group">
          <input type="text" placeholder="Message#General" />
          <button id="message-submit-button" type="button">
            <SendIcon fontSize="small"/>
          </button>
        </div>
      </form>
  );

 }

export default MessageForm;