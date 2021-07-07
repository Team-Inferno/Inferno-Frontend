import React,{useState} from 'react'
import SendIcon from "@material-ui/icons/Send";
import { useSelector, useDispatch } from "react-redux";
const axios = require("axios");


const MessageForm = (props) => {
  const [message, setMessage] = useState("");

  const user_id = useSelector((state) => {
    return state.userReducer._id;
  });

  const channel_id = useSelector((state) => {
    return state.channelReducer.currentTextChannel._id;
  });

  const sender_name = useSelector((state) => {
    return state.userReducer.username;
  });

  const submitForm = (e) => {
    e.preventDefault();
    

    axios
      .post("http://localhost:8080/api/conversation/",null, {
        params: { content: message, sender: user_id, channel_id: channel_id, sender_name: sender_name },
      })
      .then((res) => {
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
        }
      });
    setMessage("");
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