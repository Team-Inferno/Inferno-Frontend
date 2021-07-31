import React, { useState } from "react";
import ReactDOM from "react-dom";
import { useMutation } from "react-query";
import { renameChannel } from "../api/channel.api";
import { useQueryClient } from "react-query";
import Loader from "react-loader-spinner";

const ChannelRenameForm = (props) => {
  const [channelName, setChannelName] = useState("");
  const queryClient = useQueryClient();

  const { mutate, isLoading, error } = useMutation((data) => renameChannel(data), {
    retry: 3,
    onSuccess: (res) => {
      queryClient.invalidateQueries(["server", props.serverID]);
      props.visibility(false);
    },
  });
  const submit = (e) => {
    e.preventDefault();

    mutate({
      serverID: props.serverID,
      roomID: props.roomID,
      channelID: props.channelID,
      channelName: channelName,
    });
  };

  return ReactDOM.createPortal(
    <>
      <div className="popup-body" onClick={() => props.visibility(false)}>
        <div className="popup-container" onClick={(e) => e.stopPropagation()}>
          <div className="popup-header">
            <p>Rename Channel</p>
          </div>
          <div className="popup-input">
            <label id="popup-label" htmlFor="room-name">
              channel-name
            </label>
            <input
              id="popup-name"
              type="text"
              value={channelName}
              onChange={(e) => setChannelName(e.target.value)}
            />
            <span className="error">
              {error && error.response.data.error.channel_name}
            </span>
            <div className="button-area">
              <button onClick={(e) => submit(e)} id="create-channel-button">
                {isLoading ? (
                  <Loader
                    type="ThreeDots"
                    color="#00BFFF"
                    height={5}
                    width={20}
                    timeout={3000} //3 secs
                  />
                ) : (
                  <>Rename</>
                )}
              </button>
              <button
                id="popup-cancel-button"
                onClick={() => props.visibility(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </>,
    document.querySelector("#server")
  );
};

export default ChannelRenameForm;
