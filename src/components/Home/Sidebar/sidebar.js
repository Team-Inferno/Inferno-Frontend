import React from "react";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import AddIcon from "@material-ui/icons/Add";
import "../css/sidebar.css";

const Sidebar = (props) => {
  return (
    <div className="sidebar">
      <section className="top-section">
        <h3 className="channel-name">Laugh Tales</h3>
        <ExpandMoreIcon className="expand-icon" />
      </section>
      <hr />
      <section className="room-section">
        <div className="header">
          <p className="room-name">General</p>
          <AddIcon />
        </div>
      </section>
    </div>
  );
};

export default Sidebar;
