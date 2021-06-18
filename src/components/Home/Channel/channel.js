import React from 'react';
import TextIcon from "@material-ui/icons/ChatBubbleOutline";
import VoiceIcon from "@material-ui/icons/VolumeUp";

const Channel = (props) => {
  return (
    <div className="channel">
      <TextIcon fontSize="small" className="text-channel-icon" />
      <p className="channel-name">Gaming</p>
    </div>
  );

 }

export default Channel;