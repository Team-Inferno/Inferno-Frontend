import React, { useState } from "react";
import ReactDOM from "react-dom";
import { useMutation } from "react-query";
import { renameRoom } from "../api/room.api";
import { useQueryClient } from "react-query";
import Loader from "react-loader-spinner";

const RoomRenameModal = (props) => {
  const [roomName, setRoomName] = useState("");
  const queryClient = useQueryClient();


  const { mutate, isLoading, error } = useMutation((data) => renameRoom(data), {
    retry: 3,
    onSuccess: (res) => {
      queryClient.invalidateQueries(["server", props.serverID]);
      props.visibility(false)
    },
  });

  const submit = (e) => {
    e.preventDefault();

    mutate({
      roomName: roomName,
      serverID: props.serverID,
      roomID: props.roomID,
    });
  };

  return ReactDOM.createPortal(
    <>
      <div className="popup-body" onClick={() => props.visibility(false)}>
        <div className="popup-container" onClick={(e) => e.stopPropagation()}>
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
            <span className="error">
              {error && error.response.data.error.room_name}
            </span>
            <div className="button-area">
              <button onClick={(e) => submit(e)} id="popup-button">
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

export default RoomRenameModal;
