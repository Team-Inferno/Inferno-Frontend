import React from 'react'
import MicIcon from "@material-ui/icons/Mic";
import HeadsetMicIcon from "@material-ui/icons/HeadsetMic";
import SettingsIcon from "@material-ui/icons/Settings";

const User = (props) => {
  return (
    <>
      <div className="user-image"></div>
      <div className="username">backbitter0</div>
      <div id="mic-icon">
        <MicIcon fontSize="small" />
      </div>
      <div id="headphone-icon">
        <HeadsetMicIcon fontSize="small" />
      </div>
      {/*<div id="settings-icon">
        <SettingsIcon fontSize="small" />
  </div>*/}
    </>
  );

 }

export default User;