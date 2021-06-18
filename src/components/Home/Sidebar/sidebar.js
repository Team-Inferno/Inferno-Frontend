import React from "react";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Room from "../Room/room";
import VoiceConnection from "../VoiceConnection/voiceconnection";
import User from "../User/user"

const Sidebar = (props) => {
  return (
    <div className="sidebar">
      <section className="top-section">
        <p className="server-name">Laugh Tales</p>
        <ExpandMoreIcon className="server-expand-icon" />
      </section>

      <section className="room-section">
        <div className="room-list">
          <Room />
          <Room />
          <Room />
          <Room />
          <Room />
        </div>
      </section>

      <section className="voice-connection">
        <VoiceConnection />
      </section>

      <section className="user-status">
        <User />
      </section>


    </div>
  );
};

export default Sidebar;
