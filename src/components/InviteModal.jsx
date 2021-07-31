import React, { useState } from "react";
import ReactDOM from "react-dom";
import { useMutation } from "react-query";
import { useDispatch } from "react-redux";
import { setInviteModal } from "../redux/modal.slice";
import { sendInvitation } from "../api/user.api";

const InviteModal = (props) => {
  const [username, setUsername] = useState("");
  const dispatch = useDispatch();

  const { mutate, isLoading, error } = useMutation(
    (data) => sendInvitation(data),
    {
      retry: 3,
      onSuccess: (res) => {
        dispatch(setInviteModal(false));
      },
    }
  );

  const submit = (e) => {
    e.preventDefault();

    if (username.length > 0) {
      mutate({
        username: username,
        serverID: props.serverID,
        senderID: props.senderID,
      });
    }
  };

  if(error){
      console.log(error.response?.data);
  }

  return ReactDOM.createPortal(
    <>
      <div className="popup-body" onClick={() => dispatch(setInviteModal(false))}>
        <div className="popup-container" onClick={(e) => e.stopPropagation()}>
          <div className="popup-header">
            <p>Invite Friends</p>
          </div>
          <div className="popup-input">
            <label id="popup-label" htmlFor="room-name">
              Username
            </label>
            <input
              id="popup-name"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <div className="button-area">
              <button onClick={(e) => submit(e)} id="popup-button">
                send Invitation
              </button>
              <button
                id="popup-cancel-button"
                onClick={() => dispatch(setInviteModal(false))}
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

export default InviteModal;
