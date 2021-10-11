import React,{useEffect} from "react";
import MessageForm from "./MessageForm";
import TextIcon from "@material-ui/icons/ChatBubbleOutline";
import { useSelector } from "react-redux";
import MessageList from "./MessageList";


const Chat = (props) => {

  

  

  const textChannel = useSelector((state) => {
    return state.channelReducer.currentTextChannel;
  });

  

  const ChatHeader = () => {
    return (
      <section className="chat-header">
        <div className="chat-channel-name">
          <TextIcon fontSize="default" className="text-channel-icon" />
          <p>{textChannel.channel_name}</p>
        </div>
      </section>
    );
  };

  if (textChannel) {
    return (
      <div id="chat">
        <ChatHeader />

        <section className="chat-body">
          <div className="messages">
            <MessageList channelID={textChannel?._id} ChatHeader={ChatHeader}/>
          </div>

          <div className="send-message-section">
            <MessageForm
              channelName={textChannel.channel_name}
              channelID={textChannel._id}
              userName={props.userName}
              userID={props.userID}
            />
          </div>
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
