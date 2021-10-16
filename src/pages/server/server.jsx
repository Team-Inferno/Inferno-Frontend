import React, {  useRef, useEffect } from "react";
import Peer from "peerjs";
import useAuthorization from "../../hooks/useAuthorization";
import { useParams } from "react-router-dom";
import { PeerContext } from "../../context/PeerContext";
import "./css/server.css";
import ServerBody from "../../components/server.component/ServerBody";

export const Server = (props) => {
  const { decodeToken } = useAuthorization();
  var user = decodeToken();


  const { id } = useParams();
  const peer = useRef(new Peer(user.id, {
    token: "gg"
  }));

  useEffect(() => {
    var p = peer.current;
    p?.on("open", (id) => {
      console.log(id);
    });
    return () => {
      p.destroy();
      console.log("destroyed")
    };
  }, [peer]);

  return (
    <PeerContext.Provider value={peer}>
      <ServerBody id={id} user={user}/>
    </PeerContext.Provider>
  );
};
