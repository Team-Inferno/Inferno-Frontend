import React, { useState } from "react";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import AddIcon from "@material-ui/icons/Add";
import ShrinkIcon from "@material-ui/icons/ExpandLess";
import Channel from "./Channel/channel";
import AddChannel from "../../AddChannelPopUp/addchannel";
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";
import RoomRenameForm from "../../RenameRoomPopUp/roomrename";
const axios = require("axios");

const Room = (props) => {
  const [isChannelExpanded, setIsChannelExpanded] = useState(true);
  const [addChannelPopUp, setAddChannelPopUp] = useState(false);
  const [isRoomRenameFormVisible, setIsRoomRenameFormVisible] = useState(false);

  const deleteRoom = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:8080/api/server/delete/room", null, {
        params: { server_id: props.currentServerID, room_id: props.room._id },
      })
      .then((res) => console.log(res.data))
      .catch((error) => console.log(error.response));
  };

  return (
    <div className="room">
      <ContextMenuTrigger id={props.room._id}>
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
            <p>{props.room ? props.room.room_name : ""}</p>
          </div>
          <div
            className="add-channel-icon"
            onClick={() => setAddChannelPopUp(!addChannelPopUp)}
          >
            <AddIcon fontSize="default" />
          </div>
        </div>
      </ContextMenuTrigger>

      <ContextMenu id={props.room._id}>
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
                <button
                  className="context-list-item button-danger"
                  onClick={(e) => deleteRoom(e)}
                >
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
            {props.room
              ? props.room.channels.map((channel) => {
                  return (
                    <li key={channel._id}>
                      <Channel
                        channel={channel}
                        roomID={props.room._id}
                        channelID={props.currentServerID}
                        currentServerID={props.currentServerID}
                      />
                    </li>
                  );
                })
              : null}
          </ul>
        </div>
      )}
      {addChannelPopUp && (
        <AddChannel popUp={setAddChannelPopUp} room={props.room} />
      )}
      {isRoomRenameFormVisible && (
        <RoomRenameForm
          popUp={setIsRoomRenameFormVisible}
          roomID={props.room._id}
        />
      )}
    </div>
  );
};

export default Room;
