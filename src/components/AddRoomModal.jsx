import React, { useState } from "react";
import ReactDOM from "react-dom";
import { useDispatch } from "react-redux";
import { setAddRoomModal } from "../redux/modal.slice";
import { useMutation } from "react-query";
import { addRoom } from "../api/room.api";
import { useQueryClient } from "react-query";
import Loader from "react-loader-spinner";

const AddRoomModal = (props) => {
  const [roomName, setRoomName] = useState("");

  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const { mutate, isLoading, error } = useMutation((data) => addRoom(data), {
    retry: 3,
    onSuccess: (res) => {
      queryClient.invalidateQueries(["server", props.serverID]);
      dispatch(setAddRoomModal(false));
    },
  });

  //console.log(error?.response?.data);

  const submitAddServer = (e) => {
    e.preventDefault();
    mutate({
      roomName: roomName,
      serverID: props.serverID,
    });
    setRoomName("");
  };

  return ReactDOM.createPortal(
    <>
      <div
        className="popup-body"
        onClick={() => dispatch(setAddRoomModal(false))}
      >
        <div className="popup-container" onClick={(e) => e.stopPropagation()}>
          <div className="popup-header">
            <p>Create Room</p>
          </div>
          <div className="popup-input">
            <label id="popup-label" htmlFor="server-name">
              Room Name
            </label>
            <input
              id="popup-name"
              type="text"
              value={roomName}
              onChange={(e) => setRoomName(e.target.value)}
            />
            <span className="error">{error && error.response.data.error.room_name}</span>
            <div className="button-area">
              <button
                onClick={(e) => submitAddServer(e)}
                id="create-server-button"
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
                  <>Create Room</>
                )}
              </button>
              <button
                id="popup-cancel-button"
                onClick={() => dispatch(setAddRoomModal(false))}
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

export default AddRoomModal;
