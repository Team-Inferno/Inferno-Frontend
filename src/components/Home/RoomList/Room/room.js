import React, { useState, useEffect } from "react";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import AddIcon from "@material-ui/icons/Add";
import ShrinkIcon from "@material-ui/icons/ExpandLess";
import Channel from "./Channel/channel";
import AddChannel from "../../AddChannelPopUp/addchannel";
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";
import RoomRenameForm from "../../RenameRoomPopUp/roomrename";

const Room = (props) => {
  const [isChannelExpanded, setIsChannelExpanded] = useState(true);
  const [addChannelPopUp, setAddChannelPopUp] = useState(false);
  const [isRoomRenameFormVisible, setIsRoomRenameFormVisible] = useState(false);

  return (
    <div className="room">
      <ContextMenuTrigger id={props.props._id}>
        <div className="header">
          <div className="room-name">
            {isChannelExpanded ? (
              <ExpandMoreIcon
                className="expand-icon"
                fontSize="small"
                onClick={(e) => setIsChannelExpanded(false)}
              />
            ) : (
              <ShrinkIcon
                className="expand-icon"
                fontSize="small"
                onClick={(e) => setIsChannelExpanded(true)}
              />
            )}
            <p>{props.props ? props.props.room_name : ""}</p>
          </div>
          <div
            className="add-channel-icon"
            onClick={() => setAddChannelPopUp(!addChannelPopUp)}
          >
            <AddIcon fontSize="default" />
          </div>
        </div>
      </ContextMenuTrigger>

      <ContextMenu id={props.props._id}>
        <div className="context">
          <div className="context-wrapper">
            <div role="list" className="context-list">
              <MenuItem data={{ foo: "bar" }}>
                <button
                  className="context-list-item"
                  onClick={(e) =>
                    setIsRoomRenameFormVisible(!isRoomRenameFormVisible)
                  }
                >
                  Rename Room
                </button>
              </MenuItem>
              <MenuItem data={{ foo: "bar" }}>
                <button className="context-list-item button-danger">
                  Delete Room
                </button>
              </MenuItem>
              <MenuItem divider />
            </div>
          </div>
        </div>
      </ContextMenu>

      {isChannelExpanded && (
        <div className="channel-list">
          <ul>
            {props.props
              ? props.props.channels.map((channel) => {
                  return (
                    <li key={channel._id}>
                      <Channel channel={channel} roomID={props.props._id} />
                    </li>
                  );
                })
              : null}
          </ul>
        </div>
      )}
      {addChannelPopUp && (
        <AddChannel popUp={setAddChannelPopUp} room={props.props} />
      )}
      {isRoomRenameFormVisible && (
        <RoomRenameForm
          popUp={setIsRoomRenameFormVisible}
          roomID={props.props._id}
        />
      )}
    </div>
  );
};

export default Room;
