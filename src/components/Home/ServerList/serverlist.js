import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentServerID } from "../../../redux/server.slice";

const ServerList = (props) => {
  const serverList = useSelector((state) => {
    return state.serverReducer.subscribedServers;
  });

  const dispatch = useDispatch();

  return ReactDOM.createPortal(
    <>
      <div className="server-list-dropdown">
        <div className="server-list-container">
          <div className="server-list">
            <ul>
              {serverList && serverList.map((item) => {
                return (
                  <li
                    className="server-list-item"
                    key={item.server_id}
                    onClick={(e) => dispatch(setCurrentServerID(item))}
                  >
                    <div className="server-list-item-logo">
                      {item.server_logo ? (
                        item.server_logo
                      ) : (
                        <AccountCircleIcon />
                      )}
                    </div>
                    <div className="server-list-item-name">
                      {item.server_name}
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
