import React, { useState } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import { useSelector } from "react-redux";

const ServerRenameForm = (props) => {
  const [serverName, setServerName] = useState("");

  const server_id = useSelector((state) => {
    return state.serverReducer.currentServer._id;
  });

  const submit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:8080/api/server/rename/server", null, {
        params: {
          server_name: serverName,
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
            <p>Rename Server</p>
          </div>
          <div className="popup-input">
            <label id="popup-label" htmlFor="server-name">
              Server Name
            </label>
            <input
              id="popup-name"
              type="text"
              value={serverName}
              onChange={(e) => setServerName(e.target.value)}
            />
            <div className="button-area">
              <button onClick={(e) => submit(e)} id="create-server-button">
                Rename Server
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

export default ServerRenameForm;