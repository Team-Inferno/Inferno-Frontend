import React from "react";
import { useQuery } from "react-query";
import { getUserName, acceptInvitation } from "../api/user.api";
import { getServerName } from "../api/server.api";
import { useMutation } from "react-query";
import Loader from "react-loader-spinner";

const Invite = (props) => {
  const serverID = props.invite?.server_id;
  const senderID = props.invite?.sender_id;

  const serverNameQuery = useQuery(
    ["server-name", serverID],
    () => {
      return getServerName(serverID);
    },
    { refetchOnWindowFocus: false }
  );

  const userNameQuery = useQuery(
    ["user-name", senderID],
    () => {
      return getUserName(senderID);
    },
    { refetchOnWindowFocus: false }
  );

  const acceptMutation = useMutation((data) => acceptInvitation(data), {
    retry: 3,
    onSuccess: (res) => {},
  });

  const declineMutation = useMutation((data) => acceptInvitation(data), {
    retry: 3,
    onSuccess: (res) => {},
  });

  //console.log(acceptMutation.error?.response?.data);
  //console.log(declineMutation.error?.response?.data);

  const handleAcceptButton = () => {
    acceptMutation.mutate({
      inviteID: props.invite._id,
      userID: props.userID,
    });
  };

  const handleDeclineButton = () => {
    declineMutation.mutate({
      inviteID: props.invite._id,
      userID: props.userID,
    });
  };

  return (
    <div className="invite-box">
      <div className="invite-description">
        <p>
          User {`${userNameQuery?.data}`} Invites you To The server
          <span>{` ${serverNameQuery?.data}`}</span>
        </p>
      </div>
      <div className="button-area">
        <button
          className="invite-accept-button"
          onClick={() => handleAcceptButton()}
        >
          {acceptMutation.isLoading ? (
            <Loader
              type="ThreeDots"
              color="#00BFFF"
              height={20}
              width={20}
              timeout={3000} //3 secs
            />
          ) : (
            "Accept"
          )}
        </button>
        <button
          className="invite-decline-button"
          onClick={() => handleDeclineButton()}
        >
          {declineMutation.isLoading ? (
            <Loader
              type="ThreeDots"
              color="#00BFFF"
              height={20}
              width={20}
              timeout={3000} //3 secs
            />
          ) : (
            "Decline"
          )}
        </button>
      </div>
    </div>
  );
};

export default Invite;
