import React, { useState } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import { useSelector } from "react-redux";

const ChannelRenameForm = (props) => {
  const [channelName, setChannelName] = useState("");

  const server_id = useSelector((state) => {
    return state.serverReducer.currentServer._id;
  });

  const submit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:8080/api/server/rename/channel", null, {
        params: {
          channel_name: channelName,
          server_id: server_id,
          room_id: props.roomID,
          channel_id: props.channelID
        },
      })
      .then((res) => {
        console.log(res);
        if (!res.data.error) {
          props.popUp(false);
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return ReactDOM.createPortal(
    <>
      <div className="popup-body" onClick={() => props.popUp(false)}>
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
            <div className="button-area">
              <button onClick={(e) => submit(e)} id="create-channel-button">
                Rename Channel
              </button>
              <button
                id="popup-cancel-button"
                onClick={() => props.popUp(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </>,
    document.querySelector("#home")
  );
};

export default ChannelRenameForm;
