import React, { useState, useEffect } from "react";
import RoomList from "../../RoomList/roomlist";
import ServerList from "../../ServerList/serverlist";
import ConnectionStatus from "../../ConnectionStatus/connectionstatus";
import CurrentServer from "../../Server/server.current";
import { useSelector, useDispatch } from "react-redux";
import AddServer from "../../AddServerPopUp/addserver";
import {
  setCurrentServer,
  setServerList,
  setCurrentServerID,
} from "../../../../redux/server.slice";
import io from "socket.io-client";
const axios = require("axios");

const LeftSidebar = (props) => {
  const [isServerListOpen, setIsServerListOpen] = useState(false);
  const [addServerPopUp, setAddServerPopUp] = useState(false);

  const user_id = useSelector((state) => {
    return state.userReducer._id;
  });

  const currentServerID = useSelector((state) => {
    return state.serverReducer.currentServerID;
  });

  const subscribedServer = useSelector((state) => {
    return state.serverReducer.subscribedServers;
  });

  const dispatch = useDispatch();

  useEffect(() => {
    const socket = io(`http://localhost:9090`);

    if (currentServerID) {
      axios
        .get("http://localhost:8080/api/server", {
          params: { server_id: currentServerID },
        })
        .then((res) => {
          dispatch(setCurrentServer(res.data));
        })
        .catch((error) => {
          if (error.response) {
          }
        });

      socket.emit("server-update", currentServerID);
      socket.on("serverUpdate", (server) => {
        console.log(server);
        dispatch(setCurrentServer(server));
      });

      socket.emit("new-server-added", user_id);

      socket.on("server-added", (server) => {
        console.log([...subscribedServer, server]);
        dispatch(setServerList([...subscribedServer, server]));
        dispatch(setCurrentServerID(server.server_id));
      });
    }

    
  }, [currentServerID]);

  return (
    <div className="left-sidebar">
      <section id="server-section">
        <CurrentServer
          openList={isServerListOpen}
          setOpenList={setIsServerListOpen}
        />
        {isServerListOpen && <ServerList popUp={setAddServerPopUp} listOpen={setIsServerListOpen}/>}
        {addServerPopUp && <AddServer popUp={setAddServerPopUp} />}
      </section>

      <section id="room-section">
        <RoomList currentServerID={currentServerID}/>
      </section>

      <section id="status">
        <ConnectionStatus />
      </section>
    </div>
  );
};

export default LeftSidebar;
