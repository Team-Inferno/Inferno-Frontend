import React from "react";
import SignalCellularAltIcon from "@material-ui/icons/SignalCellularAlt";
import DisconnectIcon from "@material-ui/icons/PhoneDisabled";
import MicIcon from "@material-ui/icons/Mic";
import HeadsetMicIcon from "@material-ui/icons/HeadsetMic";

const ConnectionStatus = (props) => {
  return (
    <>
      <div className="container">
        <div className="connection-status">
          <SignalCellularAltIcon />
          <p>Voice Connected</p>
        </div>
        <div className="icons">
          <div id="mic-icon">
            <MicIcon fontSize="small" />
          </div>
          <div id="headphone-icon">
            <HeadsetMicIcon fontSize="small" />
          </div>
          <div id="disconnect-icon">
            <DisconnectIcon fontSize="small" />
          </div>
        </div>
      </div>
    </>
  );
};

export default ConnectionStatus;
