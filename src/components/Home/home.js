import React, { useEffect } from "react";
import "./css/home.css";
import LeftSidebar from "./Sidebar/LeftSidebar/sidebar.left";
import Chat from "./Chat/chat";
import { useSelector, useDispatch } from "react-redux";
import { setError } from "../../redux/error.slice";
import { setServerList, setCurrentServerID } from "../../redux/server.slice";
import io from "socket.io-client";
const axios = require("axios");

const Home = () => {
  const user_id = useSelector((state) => {
    return state.userReducer._id;
  });

  const dispatch = useDispatch();

  useEffect(() => {
    const socket = io(`http://localhost:9090`);

    axios
      .get("http://localhost:8080/api/user/server", {
        params: { user_id: user_id },
      })
      .then((res) => {
        dispatch(setServerList(res.data));
        dispatch(setCurrentServerID(res.data.servers[0]));
      })
      .catch((error) => {
        if (error.response) {
          dispatch(setError(error.response.data.error));
        }
      });

    socket.emit("user-update", user_id);

    socket.on("connect", () => {
      socket.send("hi from client");
    });

    socket.on("insertServer", (server) => {
      //console.log(server.members);
      //const newServer = {server_id: server._id, server_name:server.server_name}
      //dispatch(setServerList({...serverList,newServer}));
    });
  }, [user_id, dispatch]);

  return (
    <div id="home">
      <LeftSidebar />
      <Chat />
    </div>
  );
};

export default Home;
