import React from "react";
import TextIcon from "@material-ui/icons/ChatBubbleOutline";
import VoiceIcon from "@material-ui/icons/VolumeUp";

import { ContextMenu, ContextMenuTrigger } from "react-contextmenu";
import ChannelContextMenu from "./ChannelContextMenu";




const ChannelHeader = (props) => {
  const channel = props.channel;

  return (
    <>
      <ContextMenuTrigger id={channel._id}>
        <div className="channel-info" onClick={(e) => props.setChannel()}>
          {channel.__t === "text" ? (
            <TextIcon fontSize="small" className="text-channel-icon" />
          ) : (
            <VoiceIcon fontSize="small" className="text-channel-icon" />
          )}
          <p className="channel-name">{channel.channel_name}</p>
        </div>
      </ContextMenuTrigger>

      <ContextMenu id={props.channel._id}>
        {props.owner && (
          <ChannelContextMenu
            roomID={props.roomID}
            serverID={props.serverID}
            channelID={props.channel._id}
          />
        )}
      </ContextMenu>
    </>
  );
};

export default ChannelHeader;
