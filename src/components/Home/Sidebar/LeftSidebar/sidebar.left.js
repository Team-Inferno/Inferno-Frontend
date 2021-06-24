import React, { useState, createRef, useEffect } from "react";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import CloseIcon from "@material-ui/icons/Close";
import Room from "../../Room/room";
import ConnectionStatus from "../../ConnectionStatus/connectionstatus";
import Dropdown from "../../DropDownMenu/dropdown";

const LeftSidebar = (props) => {
  const [isListOpen, setIsListOpen] = useState(false);

  const dropdown = createRef();

  const handleClickOutside = (e) => {
    if (isListOpen) {
      setIsListOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", () => {
      handleClickOutside();
    });
    return () => {
      document.removeEventListener("mousedown", () => handleClickOutside);
    };
  });

  const handleClick = (event) => {
    setIsListOpen(!isListOpen);
  };

  return (
    <div className="left-sidebar">
      <section className="top-section">
        <div className="server-info" onClick={handleClick}>
          <p className="server-name">Laugh Tales</p>
          {isListOpen ? (
            <CloseIcon className="top-sidebar-icon" />
          ) : (
            <ExpandMoreIcon className="top-sidebar-icon" />
          )}
        </div>
      </section>

      <section className="room-section">
        {isListOpen && (
          <div className="server-dropdown" ref={dropdown}>
            <Dropdown openList={isListOpen} />
          </div>
        )}

        <div className="room-list">
          <Room />
          <Room />
          <Room />
          <Room />
          <Room />
        </div>
      </section>

      <section className="status">
        <ConnectionStatus />
      </section>
    </div>
  );
};

export default LeftSidebar;
