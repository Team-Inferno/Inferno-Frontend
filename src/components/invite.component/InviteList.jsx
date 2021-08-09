import React from "react";
import Invite from "./Invite";

const InviteList = (props) => {
  return (
    <>
      {props.inviteList?.map((invite) => {
        return <Invite invite={invite} key={invite._id} userID={props.userID}/>;
      })}
    </>
  );
};

export default InviteList;
