import React from "react";
import { ContextMenu, ContextMenuTrigger } from "react-contextmenu";
import TextIcon from "@material-ui/icons/ChatBubbleOutline";
import VoiceIcon from "@material-ui/icons/VolumeUp";
import ChannelContextMenu from "./ChannelContextMenu";
import { useDispatch } from "react-redux";
import {
  setCurrentTextChannel,
  setCurrentVoiceChannel,
} from "../redux/channel.slice";


const Channel = (props) => {
  const channel = props.channel;
  const dispatch = useDispatch();

  const setChannel = () => {
    if (channel.__t === "text") {
      dispatch(setCurrentTextChannel(channel));
    } else if (channel.__t === "voice") {
      dispatch(setCurrentVoiceChannel(channel));
    }
  };

  return (
    <>
      <ContextMenuTrigger id={channel._id}>
        <div className="channel" onClick={(e) => setChannel()}>
          {channel.__t === "text" ? (
            <TextIcon fontSize="small" className="text-channel-icon" />
          ) : (
            <VoiceIcon fontSize="small" className="text-channel-icon" />
          )}
          <p className="channel-name">{channel.channel_name}</p>
          {channel.__t === "voice" && (
            <div className="subscribers">
              {/*<ul>
                {channel.subscribers.map((subscriber) => {
                  return (
                    <li key={subscriber._id}>
                      <subscriber props={subscriber} />
                    </li>
                  );
                })}
              </ul>*/}
            </div>
          )}
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

export default Channel;
