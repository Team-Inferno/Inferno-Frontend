import React, { useState, useEffect } from "react";
import RoomList from "../../RoomList/roomlist";
import ConnectionStatus from "../../ConnectionStatus/connectionstatus";
import CurrentServer from "../../Server/server.current";
import { useSelector, useDispatch } from "react-redux";
import { setError } from "../../../../redux/error.slice";
const axios = require("axios");

const LeftSidebar = (props) => {
  const [currentServer, setCurrentServer] = useState(null);

  const servers = useSelector((state) => {
    return state.userReducer.servers;
  });

  var currentServerId;
  if(servers != null){
    currentServerId = servers[0];
  }

  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/server", {
        params: { server_id: currentServerId },
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => {
        if (error.response) {
          dispatch(setError(error.response.data.error));
        }
      });
  }, []);

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
