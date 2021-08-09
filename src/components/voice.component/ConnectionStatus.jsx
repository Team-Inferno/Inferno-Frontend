import React from "react";
import { useSelector } from "react-redux";
import MicIcon from "@material-ui/icons/Mic";
import MicOffIcon from "@material-ui/icons/MicOff";
import HeadsetIcon from "@material-ui/icons/Headset";
import Headset from "@material-ui/icons/Headset";


const ConnectionStatus = (props) => {

  const voiceChannel = useSelector(state => {
    return state.channelReducer.currentVoiceChannel;
  })

  console.log(voiceChannel);

  return (
    <div className="connection-status">
      <p>
        connected to <span>{voiceChannel.channel_name}</span>
      </p>
      <div className="voice-options">
        <div className="mute-option">
          <MicIcon />
        </div>
        <div className="deafen-option">
          <Headset />
        </div>
      </div>
    </div>
  );
};

export default ConnectionStatus;
