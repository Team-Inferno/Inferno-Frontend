import React from "react";
import ReactDOM from "react-dom";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentServerID } from "../../../redux/server.slice";

const ServerList = (props) => {
  const serverList = useSelector((state) => {
    return state.serverReducer.subscribedServers;
  });

  const dispatch = useDispatch();

  const selectServer = (e,server) => {
    e.preventDefault();
    dispatch(setCurrentServerID(server));
    props.listOpen(false);
  }

  return ReactDOM.createPortal(
    <>
      <div className="server-list-dropdown">
        <div className="server-list-container">
          <div className="server-list">
            <ul>
              {serverList && serverList.map((server) => {
                return (
                  <li
                    className="server-list-item"
                    key={server.server_id}
                    onClick={(e) => selectServer(e,server)}
                  >
                    <div className="server-list-item-logo">
                      {server.server_logo ? (
                        server.server_logo
                      ) : (
                        <AccountCircleIcon />
                      )}
                    </div>
                    <div className="server-list-item-name">
                      {server.server_name}
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
          <button onClick={(e) => props.popUp(true)}>Create New Server</button>
        </div>
      </div>
    </>,
    document.getElementById("room-section")
  );
};

export default ServerList;
