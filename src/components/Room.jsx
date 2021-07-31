import React, { useState } from "react";
import { ContextMenuTrigger, ContextMenu } from "react-contextmenu";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import AddIcon from "@material-ui/icons/Add";
import ShrinkIcon from "@material-ui/icons/ExpandLess";
import ChannelList from "./ChannelList";
import AddChannelModal from "./AddChannelModal";
import useAuthorization from "../hooks/useAuthorization";
import RoomContextMenu from "./RoomContextMenu";

const Room = (props) => {
  const { decodeToken } = useAuthorization();
  var user = decodeToken();

  const [isChannelExpanded, setIsChannelExpanded] = useState(true);
  const [addChannelModalVisible, setAddChannelModalVisible] = useState(false);

  const room = props.room;
  const serverID = props.serverID;
  const owner = props.owner;

  

  return (
    <>
      <div className="room">
        <ContextMenuTrigger id={room._id}>
          <div className="room-header">
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
              <p>{room ? room.room_name : ""}</p>
            </div>
            {user.id === owner && (
              <div
                className="add-channel-icon"
                onClick={() => setAddChannelModalVisible(true)}
              >
                <AddIcon fontSize="default" />
              </div>
            )}
          </div>
        </ContextMenuTrigger>

        <ContextMenu id={room._id}>
          {user.id === owner && (
            <RoomContextMenu roomID={room._id} serverID={serverID} />
          )}
        </ContextMenu>

        {isChannelExpanded && (
          <ChannelList
            channels={room.channels}
            roomID={room._id}
            serverID={serverID}
            owner={user.id === owner? true:false}
          />
        )}
      </div>

      {addChannelModalVisible && (
        <AddChannelModal
          roomID={room._id}
          serverID={serverID}
          roomName={room.room_name}
          visibility={setAddChannelModalVisible}
        />
      )}
    </>
  );
};

export default Room;
