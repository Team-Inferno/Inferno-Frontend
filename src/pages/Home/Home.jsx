import React, { useEffect } from "react";
import "../../components/Home/css/home.css";
import LeftSidebar from "../../components/Home/Sidebar/LeftSidebar/sidebar.left";
import Chat from "../../components/Home/Chat/chat";
import { useSelector, useDispatch } from "react-redux";
import { setError } from "../../redux/error.slice";
import { setServerList, setCurrentServerID } from "../../redux/server.slice";
import io from "socket.io-client";
import { useQuery } from "react-query";
import { getServerList } from "../../api/server.api";
import Loader from "react-loader-spinner";
const axios = require("axios");

export const Home = () => {
  const user_id = useSelector((state) => {
    return state.userReducer._id;
  });

  useEffect(() => {
    /*const socket = io(`http://localhost:9090`);

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
    };*/
  }, [user_id]);

  const dispatch = useDispatch();

  const { isLoading, isError, error, isSuccess, data } = useQuery(
    ["serverList", user_id],
    () => {
      return getServerList(user_id);
    },
    { refetchOnWindowFocus: false }
  );

  if (isSuccess) {
    console.log(data);
  }

  if (isError) {
    return <p>{error}</p>;
  }

  if (isLoading) {
    return (
      <Loader
        type="ThreeDots"
        color="#00BFFF"
        height={20}
        width={20}
        timeout={3000} //3 secs
      />
    );
  }

  return (
    <div id="home">
      <LeftSidebar serverList={data}/>
      <Chat />
    </div>
  );
};

export default Home;
