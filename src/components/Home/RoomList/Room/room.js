import React, { useState } from "react";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import AddIcon from "@material-ui/icons/Add";
import ShrinkIcon from "@material-ui/icons/ExpandLess";
import Channel from "./Channel/channel";
import AddChannel from "../../AddChannelPopUp/addchannel";

const Room = (props) => {
  const [isChannelExpanded, setIsChannelExpanded] = useState(true);
  const [addChannelPopUp, setAddChannelPopUp] = useState(false);

  
  const roomExpandHandle = () => {
    setIsChannelExpanded(!isChannelExpanded);
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
          <p>{props.props ? props.props.room_name : ""}</p>
        </div>
        <div className="add-channel-icon" onClick={() => setAddChannelPopUp(!addChannelPopUp)}>
          <AddIcon fontSize="default" />
        </div>
      </div>
      {isChannelExpanded && (
        <div className="channel-list">
          <ul>
            {props.props
              ? props.props.channels.map((channel) => {
                  return (
                    <li key={channel._id}>
                      <Channel props={channel} />
                    </li>
                  );
                })
              : null}
          </ul>
        </div>
      )}
      {addChannelPopUp && (
        <AddChannel
          popUp={setAddChannelPopUp}
          room={props.props}
        />
      )}
    </div>
  );
};

export default Room;
