import React, { useEffect, useContext } from "react";
import useAuthorization from "../../hooks/useAuthorization";
import { useQuery,useQueryClient } from "react-query";
import { getCurrentServer } from "../../api/server.api";
import { useParams } from "react-router-dom";
import Loader from "react-loader-spinner";
import RoomList from "../../components/RoomList";
import Chat from "../../components/Chat";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import { useDispatch, useSelector } from "react-redux";
import { setInviteModal } from "../../redux/modal.slice";
import InviteModal from "../../components/InviteModal";
import { SocketContext } from "../../context/socket";
import "./css/server.css";

export const Server = (props) => {
  const dispatch = useDispatch();
  const { decodeToken } = useAuthorization();
  var user = decodeToken();
  const { id } = useParams();
  const queryClient = useQueryClient();
  const socket = useContext(SocketContext);

  const inviteModalVisibility = useSelector((state) => {
    return state.modalReducer.inviteModal;
  });

  useEffect(() => {
    socket.emit("server-update", id);
    socket.on("serverUpdate", (server) => {
      queryClient.setQueryData(["server", id], server);
    });
    return () => {
      socket.off("serverUpdate", (server) => {
        queryClient.setQueryData(["server", id], server);
      });
    };
  }, [id,socket,queryClient]);

  const serverQuery = useQuery(
    ["server", id],
    () => {
      return getCurrentServer(id);
    },
    { refetchOnWindowFocus: false }
  );

  if (serverQuery.isLoading || serverQuery.isFetching) {
    return (
      <div className="loading-screen">
        <Loader type="TailSpin" color="#00BFFF" height={80} width={80} />
      </div>
    );
  }
  if (serverQuery.error) {
    return <p>Error Loading Server. Sorry, Try again</p>;
  }

  return (
    <>
      <div id="server">
        <div className="container">
          <div className="header-section">
            <div className="server-info">
              <div className="server-img">
                <img src="" alt="" />
              </div>
              <h2>{serverQuery.data.server_name}</h2>
              <div
                className="invite-button"
                onClick={() => dispatch(setInviteModal(true))}
              >
                <PersonAddIcon />
              </div>
            </div>
            <div className="user-status">
              <h3>{user ? user.username : ""}</h3>
              <div className="user-img">
                <img src="" alt="" />
              </div>
            </div>
          </div>

          <div className="server-body-section">
            <RoomList
              roomList={serverQuery.data.rooms}
              serverID={serverQuery.data._id}
              owner={serverQuery.data.owner}
            />
            <Chat userName={user.username} userID={user.id} />
          </div>
        </div>
      </div>

      {inviteModalVisibility && (
        <InviteModal senderID={user.id} serverID={id} />
      )}
    </>
  );
};
