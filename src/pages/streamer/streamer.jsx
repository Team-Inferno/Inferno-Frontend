import React, { useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { getStreamerProfile } from "../../api/streamer.api";
import "./css/streamer.css";
import Follow from "../../components/streamer.component/Follow";
import CurrentStream from "../../components/streamer.component/CurrentStream";
import { SocketContext } from "../../context/SocketContext";
import Stream from "../../components/streamer.component/Stream";

export const Streamer = (props) => {
  const socket = useContext(SocketContext);
  const { id } = useParams();

  useEffect(() => {
    socket.emit("streamer", id);

    return () => {

    };
  }, [socket,id]);

  const streamerQuery = useQuery(
    ["streamer", id],
    () => {
      return getStreamerProfile(id);
    },
    { refetchOnWindowFocus: false }
  );

  return (
    <>
      <div id="streamer-page">
        <div className="head">
          <div className="streamer-description">
            <div className="streamer-profile-picture"></div>
            <p>{`${streamerQuery?.data?.username}`}</p>
          </div>
          <Stream id={id} />
          <Follow id={id} />
        </div>
        <div className="streamer-details">
          <p id="about-streamer">{"About "}</p>
          <p id="follower-count">
            <span id="count">{`${streamerQuery?.data?.followers?.length}`}</span>
            {`   followers `}
          </p>
          <p id="short-description">{`${streamerQuery?.data?.streamer_description}`}</p>
        </div>
        <CurrentStream id={id} />
      </div>
    </>
  );
};
