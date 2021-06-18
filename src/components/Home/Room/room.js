import React from "react";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import AddIcon from "@material-ui/icons/Add";
import Channel from "../Channel/channel"
const Room = (props) => {
  return (
    <div className="room">
      <div className="header">
        <div className="room-name">
          <ExpandMoreIcon className="expand-icon" fontSize="small"/>
          <p>General</p>
        </div>
        <div className="add-channel">
          <AddIcon fontSize="medium"/>
        </div>
      </div>
      <div className="channel-list">
        <Channel />
        <Channel />
        <Channel />
      </div>
    </div>
  );
};

export default Room;
