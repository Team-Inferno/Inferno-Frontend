import React, { useState, useRef, useEffect, useContext } from "react";
import Peer from "peerjs";
import useAuthorization from "../../hooks/useAuthorization";
import { useQuery, useQueryClient } from "react-query";
import { getCurrentServer } from "../../api/server.api";
import { useParams } from "react-router-dom";
import Loader from "react-loader-spinner";
import RoomList from "../../components/room.conponent/RoomList";
import Chat from "../../components/conversation.component/Chat";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import { useDispatch, useSelector } from "react-redux";
import { setInviteModal } from "../../redux/modal.slice";
import InviteModal from "../../components/invite.component/InviteModal";
import { SocketContext } from "../../context/SocketContext";
import { PeerContext } from "../../context/PeerContext";
import "./css/server.css";
import ConnectionStatus from "../../components/voice.component/ConnectionStatus";
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
