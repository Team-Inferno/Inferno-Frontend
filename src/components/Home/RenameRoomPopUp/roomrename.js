import React, { useState } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import { useSelector } from "react-redux";

const RoomRenameForm = (props) => {
  const [roomName, setRoomName] = useState("");

  const server_id = useSelector((state) => {
    return state.serverReducer.currentServer._id;
  });

  const submit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:8080/api/server/rename/room", null, {
        params: {
          room_name: roomName,
          server_id: server_id,
          room_id: props.roomID
        },
      })
      .then((res) => {
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
        <div
          className="popup-container"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="popup-header">
            <p>Rename Room</p>
          </div>
          <div className="popup-input">
            <label id="popup-label" htmlFor="room-name">
              Room Name
            </label>
            <input
              id="popup-name"
              type="text"
              value={roomName}
              onChange={(e) => setRoomName(e.target.value)}
            />
            <div className="button-area">
              <button onClick={(e) => submit(e)} id="popup-button">
                Rename Room
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

export default RoomRenameForm;