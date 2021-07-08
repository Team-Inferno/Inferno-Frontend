import React, { useState } from "react";
import TextIcon from "@material-ui/icons/ChatBubbleOutline";
import VoiceIcon from "@material-ui/icons/VolumeUp";
import { useDispatch } from "react-redux";
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";
import {
  setCurrentTextChannel,
  setCurrentVoiceChannel,
} from "../../../../../redux/channel.slice";
import ChannelRenameForm from "../../../RenameChannelPopUp/channelrename";
const axios = require("axios");

const Channel = (props) => {
  const dispatch = useDispatch();

  const [isChannelRenameFormVisible, setIsChannelRenameFormVisible] =
    useState(false);

  const setChannel = () => {
    if (props.channel.__t === "text") {
      dispatch(setCurrentTextChannel(props.channel));
    } else if (props.channel.__t === "voice") {
      dispatch(setCurrentVoiceChannel(props.channel));
    }
  };

  const deleteChannel = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8080/api/server/delete/channel", null, {
        params: {
          server_id: props.currentServerID,
          room_id: props.roomID,
          channel_id: props.channel._id,
        },
      })
      .then((res) => console.log(res.data))
      .catch((error) => console.log(error.response));
  };

  if (props.channel) {
    return (
      <>
        <ContextMenuTrigger id={props.channel._id}>
          <div className="channel" onClick={(e) => setChannel()}>
            {props.channel.__t === "text" ? (
              <TextIcon fontSize="small" className="text-channel-icon" />
            ) : (
              <VoiceIcon fontSize="small" className="text-channel-icon" />
            )}
            <p className="channel-name">{props.channel.channel_name}</p>
            {props.channel.__t === "voice" && (
              <div className="subscribers">
                <ul>
                  {props.channel.subscribers.map((subscriber) => {
                    return (
                      <li key={subscriber._id}>
                        <subscriber props={subscriber} />
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
          </div>
        </ContextMenuTrigger>

        <ContextMenu id={props.channel._id}>
          <div className="context">
            <div className="context-wrapper">
              <div role="list" className="context-list">
                <MenuItem data={{ foo: "bar" }}>
                  <button
                    className="context-list-item"
                    onClick={(e) =>
                      setIsChannelRenameFormVisible(!isChannelRenameFormVisible)
                    }
                  >
                    Rename Channel
                  </button>
                </MenuItem>
                <MenuItem data={{ foo: "bar" }}>
                  <button
                    className="context-list-item button-danger"
                    onClick={(e) => deleteChannel(e)}
                  >
                    Delete Channel
                  </button>
                </MenuItem>
                <MenuItem divider />
              </div>
            </div>
          </div>
        </ContextMenu>
        {isChannelRenameFormVisible && (
          <ChannelRenameForm
            popUp={setIsChannelRenameFormVisible}
            channelID={props.channel._id}
            roomID={props.roomID}
          />
        )}
      </>
    );
  }
  return <></>;
};

export default Channel;
