import React, { useState } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import { useSelector } from "react-redux";

const AddRoom = (props) => {
  const [roomName, setRoomName] = useState("");

  const server_id = useSelector((state) => {
    return state.serverReducer.currentServer._id;
  });

  const submitAddRoom = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:8080/api/server/new/room", null, {
        params: {
          room_name: roomName,
          server_id: server_id,
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
        <div
          className="popup-container"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="popup-header">
            <p>Create Room</p>
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
              <button onClick={(e) => submitAddRoom(e)} id="create-room-button">
                Create Room
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

export default AddRoom;
