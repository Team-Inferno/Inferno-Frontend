import React,{useState} from 'react'
import SendIcon from "@material-ui/icons/Send";
const axios = require("axios");


const MessageForm = (props) => {
  const [message, setMessage] = useState("");

  const submitForm = (e) => {
    e.preventDefault();
    console.log(message);
  }
    
    

  return (
    <div className="send-message-form">
      <form onSubmit={e=> submitForm(e)}>
        <input type="text" placeholder="Message#General" value={message} onChange={e=> setMessage(e.target.value)}/>     
      </form>
    </div>
  );

 }

export default MessageForm;