import React, { useState } from "react";
import ReactDOM from "react-dom";
import { useDispatch } from "react-redux";
import { setAddServerModal } from "../../redux/modal.slice";
import { useMutation } from "react-query";
import { addServer } from "../../api/server.api";
import { useQueryClient } from "react-query";
import Loader from "react-loader-spinner";

const AddServerModal = (props) => {
  const [serverName, setServerName] = useState("");
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const { mutate, isLoading, error } = useMutation(
    (serverName) => addServer(serverName),
    {
      retry: 3,
      onSuccess: (res) => {
        queryClient.invalidateQueries("serverList");
        dispatch(setAddServerModal(false));
      },
    }
  );

  const submitAddServer = (e) => {
    e.preventDefault();
    mutate(serverName);
    setServerName("");
  };

  return ReactDOM.createPortal(
    <>
      <div
        className="popup-body"
        onClick={() => dispatch(setAddServerModal(false))}
      >
        <div className="popup-container" onClick={(e) => e.stopPropagation()}>
          <div className="popup-header">
            <p>Create Server</p>
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
            <span className="error">
              {error && error.response.data.error.server_name}
            </span>
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
                  <>Create Server</>
                )}
              </button>
              <button
                id="popup-cancel-button"
                onClick={() => dispatch(setAddServerModal(false))}
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

export default AddServerModal;
