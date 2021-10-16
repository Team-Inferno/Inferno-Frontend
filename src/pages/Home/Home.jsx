import React, { useState, createContext, useEffect } from "react";
import "./css/home.css";
import ServerList from "../../components/server.component/ServerList";
import { useQuery } from "react-query";
import { getServerList } from "../../api/server.api";
import { useSelector, useDispatch } from "react-redux";
import useAuthorization from "../../hooks/useAuthorization";
import AddServerModal from "../../components/server.component/AddServerModal";
import { setAddServerModal } from "../../redux/modal.slice";
import { useHistory } from "react-router-dom";
import { getUserName, isStreamer } from "../../api/user.api";
import StreamerSearch from "../../components/home.component/StreamerSearch";

export const Home = () => {
  const { decodeToken, destroyToken } = useAuthorization();
  const dispatch = useDispatch();
  const history = useHistory();

  const user = decodeToken();

  const userNameQuery = useQuery(
    ["user-name", user.id],
    () => {
      return getUserName(user.id);
    },
    { refetchOnWindowFocus: false }
  );

  const streamQuery = useQuery(
    ["streamer", user.id],
    () => {
      return isStreamer(user.id);
    },
    { refetchOnWindowFocus: false }
  );

  const addServerFormVisible = useSelector((state) => {
    return state.modalReducer.addServerModal;
  });

  const serverListQuery = useQuery(
    "serverList",
    () => {
      if (user) {
        return getServerList(user.id);
      }
    },
    { refetchOnWindowFocus: false }
  );

  const stramerListQuery = useQuery(
    ["streamerList"],
    () => {
      const user = decodeToken();
      if (user) {
        return getServerList(user.id);
      }
    },
    { refetchOnWindowFocus: false }
  );

  const handleLogout = () => {
    destroyToken();
    window.location.href = "./login";
  };

  const redirectToProfile = () => {
    history.push({
      pathname: "/profile",
    });
  };
  const redirectToStream = () => {
    history.push(`/streamer/${user.id}`);
  };

  return (
    <div id="home">
      <div id="home-container">
        <div className="profile">
          <div className="profile-description">
            <div className="profile-picture"></div>
            <div>
              <h3>{`${userNameQuery?.data}`}</h3>
              <p onClick={() => redirectToProfile()}>chnage profile details</p>
            </div>
          </div>
          <div className="logout-button">
            <button onClick={() => handleLogout()}>LOGOUT</button>
          </div>
        </div>

        <div className="list-section">
          <div className="servers">
            <div className="server-list-head">
              <h3>SERVERS</h3>
              <button
                id="create-server-button"
                onClick={() => dispatch(setAddServerModal(true))}
              >
                create server
              </button>
            </div>
            <div className="server-list">
              {serverListQuery.isLoading && <p>Loading...</p>}
              {serverListQuery.isSuccess && (
                <ServerList serverList={serverListQuery.data} />
              )}
            </div>
          </div>

          <div className="streamers">
            <div className="server-list-head">
              <h3>STREAMERS</h3>
              <StreamerSearch/>

              {streamQuery.data && (
                <button
                  id="stream-page-button"
                  onClick={() => redirectToStream()}
                >
                  My Stream
                </button>
              )}
            </div>
            <div className="streamer-list"></div>
          </div>
        </div>
        {addServerFormVisible && <AddServerModal />}
      </div>
    </div>
  );
};
