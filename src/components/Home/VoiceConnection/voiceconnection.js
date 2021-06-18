import React from 'react'
import SignalCellularAltIcon from "@material-ui/icons/SignalCellularAlt";
import DisconnectIcon from "@material-ui/icons/PhoneDisabled";
import VideocamIcon from "@material-ui/icons/Videocam";
import ScreenShareIcon from "@material-ui/icons/PersonalVideo";

const VoiceConnection = (props) => {
  return (
    <>
      <div className="voice-option">
        <div className="connection-status">
          <SignalCellularAltIcon />
          <p>Voice Connected</p>
        </div>
        <div className="disconnect-icon">
          <DisconnectIcon fontSize="small" />
        </div>
      </div>
      <div className="stream-option">
        <div className="video">
          <VideocamIcon className="icon" />
          <p>Video</p>
        </div>
        <div className="screen-share">
          <ScreenShareIcon className="icon" />
          <p>Screen</p>
        </div>
      </div>
    </>
  );

 }

export default VoiceConnection;
