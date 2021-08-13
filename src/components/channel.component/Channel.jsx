import React,{useContext,useEffect} from "react";
import { ContextMenu, ContextMenuTrigger } from "react-contextmenu";
import TextIcon from "@material-ui/icons/ChatBubbleOutline";
import VoiceIcon from "@material-ui/icons/VolumeUp";
import ChannelContextMenu from "./ChannelContextMenu";
import { useDispatch } from "react-redux";
import {
  setCurrentTextChannel,
  setCurrentVoiceChannel,
} from "../../redux/channel.slice";
import { useMutation } from "react-query";
import { joinVoiceChannel } from "../../api/channel.api";
import { SocketContext } from "../../context/SocketContext";
import SubscriberList from "../subscriber.component/SubscriberList";

const Channel = (props) => {
  const channel = props.channel;
  const dispatch = useDispatch();

  const socket = useContext(SocketContext);

  const { mutate,error } = useMutation(
    (data) => joinVoiceChannel(data),
    {
      retry: 3,
      onSuccess: (res) => {
        dispatch(setCurrentVoiceChannel(channel));
      }, 
    }
  );

  //console.log(error?.response?.data)

  const setChannel = () => {
    if (channel.__t === "text") {
      dispatch(setCurrentTextChannel(channel));
    } else if (channel.__t === "voice") {
      
      mutate({
        roomID: props.roomID,
        serverID: props.serverID,
        channelID: props.channel._id,
        userID: props.userID
      })
    }
  };



  return (
    <>
      <ContextMenuTrigger id={channel._id}>
        <div className="channel">
          <div className="channel-info" onClick={(e) => setChannel()}>
            {channel.__t === "text" ? (
              <TextIcon fontSize="small" className="text-channel-icon" />
            ) : (
              <VoiceIcon fontSize="small" className="text-channel-icon" />
            )}
            <p className="channel-name">{channel.channel_name}</p>
          </div>
          {channel.__t === "voice" && (
            <SubscriberList subscriberList={channel.subscribers} />
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
