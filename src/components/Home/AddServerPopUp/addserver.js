import React, { useState } from "react";
import ReactDOM from "react-dom";
import axios from "axios";

const AddServer = (props) => {
  const [serverName, setServerName] = useState("");

  const submitAddServer = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:8080/api/server/new/server", null, {
        params: {
          server_name: serverName,
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
      <div className="add-server-body" onClick={() => props.popUp(false)}>
        <div
          className="add-server-container"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="header">
            <p>Create Server</p>
          </div>
          <div className="server-name-input">
            <label id="server-name-label" htmlFor="server-name">
              Server Name
            </label>
            <input
              id="server-name"
              type="text"
              value={serverName}
              onChange={(e) => setServerName(e.target.value)}
            />
            <div className="button-area">
              <button
                onClick={(e) => submitAddServer(e)}
                id="create-server-button"
              >
                Create Server
              </button>
              <button
                id="add-server-cancel-button"
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

export default AddServer;
