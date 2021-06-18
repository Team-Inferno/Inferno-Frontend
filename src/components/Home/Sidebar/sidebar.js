import React from "react";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import "../css/sidebar.css";
import Room from "../Room/room";
import VoiceConnection from "../VoiceConnection/voiceconnection";
import MicIcon from "@material-ui/icons/Mic";
import HeadsetMicIcon from "@material-ui/icons/HeadsetMic";
import SettingsIcon from "@material-ui/icons/Settings";

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
        </div>
      </section>

      <section className="voice-connection">
        <VoiceConnection />
      </section>

      <section className="user-status">
        <div className="user-image"></div>
        <div className="username">backbitter0</div>
        <div id="mic-icon">
          <MicIcon fontSize="small"/>
        </div>
        <div id="headphone-icon">
          <HeadsetMicIcon fontSize="small"/>
        </div>
        <div id="settings-icon">
          <SettingsIcon fontSize="small"/>
        </div>
      </section>
    </div>
  );
};

export default Sidebar;
