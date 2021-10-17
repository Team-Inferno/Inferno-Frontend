import React from "react";
import { useQuery } from "react-query";
import { getUserName } from "../../api/user.api";

const StreamerListItem = ({ streamerID }) => {
  const userNameQuery = useQuery(
    ["user-name", streamerID],
    () => {
      return getUserName(streamerID);
    },
    { refetchOnWindowFocus: false }
  );

  return (
    <div className="list-item">
      <div className="server-list-item-logo">
        <div className="profile-picture"></div>
      </div>
      <p>{userNameQuery?.data}</p>
    </div>
  );
};

export default StreamerListItem;
