import React, { useState, useEffect } from "react";
import RoomList from "../../RoomList/roomlist";
import ConnectionStatus from "../../ConnectionStatus/connectionstatus";
import CurrentServer from "../../Server/server.current";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentServer } from "../../../../redux/server.slice";

const axios = require("axios");

const LeftSidebar = (props) => {
  var serverID = useSelector((state) => {
    return state.serverReducer.currentServerID;
  });

  const dispatch = useDispatch();

  useEffect(() => {
    if (serverID) {
      axios
        .get("http://localhost:8080/api/server", {
          params: { server_id: serverID },
        })
        .then((res) => {
          dispatch(setCurrentServer(res.data));
        })
        .catch((error) => {
          if (error.response) {
          }
        });
    }
  }, [serverID, dispatch]);

  return (
    <div className="left-sidebar">
      <section id="server-section">
        <CurrentServer />
      </section>

      <section id="room-section">
        <RoomList />
      </section>

      <section id="status">
        <ConnectionStatus />
      </section>
    </div>
  );
};

export default LeftSidebar;
