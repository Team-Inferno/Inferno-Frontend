import React, { useState } from "react";
import { MenuItem } from "react-contextmenu";
import ChannelRenameModal from "./ChannelRenameModal";
import { deleteChannel } from "../api/channel.api";
import { useQueryClient } from "react-query";
import { useMutation } from "react-query";
import Loader from "react-loader-spinner";

const ChannelContextMenu = (props) => {
  const queryClient = useQueryClient();

  const [renameChannelModalVisibility, setRenameChannelModalVisibility] =
    useState(false);

  const { mutate, isLoading, error } = useMutation(
    (data) => deleteChannel(data),
    {
      retry: 3,
      onSuccess: (res) => {
        queryClient.invalidateQueries(["server", props.serverID]);
        props.visibility(false);
      },
    }
  );

  console.log(error?.response?.data);

  const deleteButtonHandle = (e) => {
    e.preventDefault();
    mutate({
      serverID: props.serverID,
      roomID: props.roomID,
      channelID: props.channelID,
    });
  };

  return (
    <>
      <div className="context">
        <div className="context-wrapper">
          <div role="list" className="context-list">
            <MenuItem data={{ foo: "bar" }}>
              <button
                className="context-list-item"
                onClick={(e) => setRenameChannelModalVisibility(true)}
              >
                Rename Channel
              </button>
            </MenuItem>
            <MenuItem data={{ foo: "bar" }}>
              <button
                className="context-list-item button-danger"
                onClick={(e) => deleteButtonHandle(e)}
              >
                {isLoading ? (
                  <Loader
                    type="ThreeDots"
                    color="#00BFFF"
                    height={5}
                    width={20}
                    timeout={3000} //3 secs
                  />
                ) : (
                  <>Delete Channel</>
                )}
              </button>
            </MenuItem>
            <MenuItem data={{ foo: "bar" }}>
              <span className="error">
                {error && error.response.data}
              </span>
            </MenuItem>
            <MenuItem divider />
          </div>
        </div>
      </div>

      {renameChannelModalVisibility && (
        <ChannelRenameModal
          channelID={props.channelID}
          roomID={props.roomID}
          serverID={props.serverID}
          visibility={setRenameChannelModalVisibility}
        />
      )}
    </>
  );
};

export default ChannelContextMenu;
