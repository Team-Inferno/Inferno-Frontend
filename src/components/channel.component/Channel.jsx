import React, { useState, useContext, useEffect } from "react";
import { SocketContext } from "../../context/SocketContext";
import ChannelHeader from "./ChannelHeader";
import {
  setCurrentTextChannel,
  setCurrentVoiceChannel,
} from "../../redux/channel.slice";
import { useMutation } from "react-query";
import { joinVoiceChannel } from "../../api/channel.api";
import { useDispatch } from "react-redux";
import { PeerContext } from "../../context/PeerContext";
import SubscriberList from "../subscriber.component/SubscriberList";

const Channel = (props) => {
  const channel = props.channel;


  const dispatch = useDispatch();

  const { mutate, error } = useMutation((data) => joinVoiceChannel(data), {
    retry: 3,
    onSuccess: (res) => {
      sessionStorage.setItem("currentVoiceChannel", channel._id);
    },
  });

  if(error){
    console.log(error.message);
  }

  const setChannel = () => {
    if (channel.__t === "text") {
      dispatch(setCurrentTextChannel(channel));
    } else if (channel.__t === "voice") {
      mutate({
        roomID: props.roomID,
        serverID: props.serverID,
        channelID: props.channel._id,
        userID: props.userID,
      });
    }
  };

  return (
    <>
      <div className="channel">
        <ChannelHeader
          channel={channel}
          roomID={props.roomID}
          serverID={props.serverID}
          owner={props.owner}
          setChannel={setChannel}
        />
        {channel.__t === "voice" && (
          <SubscriberList
            active={sessionStorage.getItem("currentVoiceChannel")===channel._id}
            channelID={channel._id}
            subscriberList={channel.subscribers}
            userID={props.userID}
          />
        )}
      </div>
    </>
  );
};

export default Channel;
