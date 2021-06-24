import React, { useState } from "react";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import AddIcon from "@material-ui/icons/Add";
import ShrinkIcon from "@material-ui/icons/ExpandLess";
import Channel from "./Channel/channel";
import AddChannel from "../AddChannelPopUp/addchannel";
import { Hidden } from "@material-ui/core";

const Room = (props) => {
  const [isChannelExpanded, setIsChannelExpanded] = useState(true);
  const [addChannelPopUp, setAddChannelPopUp] = useState(false);

  const roomExpandHandle = () => {
    setIsChannelExpanded(!isChannelExpanded);
  };

  const showAddChannelPopUp = () => {
    setAddChannelPopUp(!addChannelPopUp);
  };

  return (
    <div className="room">
      <div className="header">
        <div className="room-name" onClick={roomExpandHandle}>
          {isChannelExpanded ? (
            <ExpandMoreIcon className="expand-icon" fontSize="small" />
          ) : (
            <ShrinkIcon className="expand-icon" fontSize="small" />
          )}
          <p>General</p>
        </div>
        <div className="add-channel-icon" onClick={() => showAddChannelPopUp()}>
          <AddIcon fontSize="default" />
        </div>
      </div>
      {isChannelExpanded && (
        <div className="channel-list">
          <Channel />
          <Channel />
          <Channel />
        </div>
      )}
      {addChannelPopUp && <AddChannel popUp={setAddChannelPopUp} />}
    </div>
  );
};

export default Room;
