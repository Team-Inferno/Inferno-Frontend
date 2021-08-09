import React from "react";
import { useQuery } from "react-query";
import { getUserName } from "../../api/user.api";

const Subscriber = ({ subscriberID }) => {
  const userNameQuery = useQuery(
    ["user-name", subscriberID],
    () => {
      return getUserName(subscriberID);
    },
    { refetchOnWindowFocus: false }
  );

  return (
    <div>
      <p>{userNameQuery?.data}</p>
    </div>
  );
};

export default Subscriber;
