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
        console.log(res.data);
        dispatch(setServerList(res.data.servers));
        dispatch(setCurrentServerID(res.data.servers[0].server_id));
      })
      .catch((error) => {
        if (error.response) {
          dispatch(setError(error.response.data.error));
        }
      });

    socket.on("connect", () => {
      socket.send("hi from client");
    });

  return () => {
    socket.disconnect();
  };
  }, [user_id]);

  return (
    <div id="home">
      <LeftSidebar />
      <Chat />
    </div>
  );
};

export default Home;
