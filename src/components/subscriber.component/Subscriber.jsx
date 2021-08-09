import React from "react";
import { useQuery } from "react-query";
import { getUserName } from "../../api/user.api";

const Subscriber = (props) => {
  //console.log(props.subscriberID);
  const userNameQuery = useQuery(
    ["user-name", props.subscriberID],
    () => {
      return getUserName(props.subscriberID);
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
