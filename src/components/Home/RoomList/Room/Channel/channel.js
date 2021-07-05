import React from "react";
import TextIcon from "@material-ui/icons/ChatBubbleOutline";
import VoiceIcon from "@material-ui/icons/VolumeUp";
import { useSelector,useDispatch } from "react-redux";
import {
  setCurrentTextChannel,
  setCurrentVoiceChannel,
} from "../../../../../redux/channel.slice";



const Channel = (props) => { 
  
  const dispatch = useDispatch();

  const setChannel = () => {
    if (props.props.__t === "text") {
      dispatch(setCurrentTextChannel(props.porps._id));
    } else if (props.props.__t === "voice") {
      dispatch(setCurrentVoiceChannel(props.porps._id));
    }
  };

  if (props.props) {
    return (
      <div className="channel" onClick={(e) => setChannel()}>
        {props.props.__t === "text" ? (
          <TextIcon fontSize="small" className="text-channel-icon" />
        ) : (
          <VoiceIcon fontSize="small" className="text-channel-icon" />
        )}
        <p className="channel-name">{props.props.channel_name}</p>
        <div className="subscribers">
          <ul>
          </ul>
        </div>
      </div>
    );
  }
  return <></>;
};

export default Channel;
