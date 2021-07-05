import React from "react";
import ReactDOM from "react-dom";

const Dropdown = (props) => {
  return ReactDOM.createPortal(
    <>
      <div className="server-option-dropdown">
        <div className="dd-wrapper">
          <div role="list" className="dd-list">
            <button className="dd-list-item" onClick={(e) => props.popUp(true)}>
              Create Room
            </button>
            <button className="dd-list-item">Invite People</button>
            <button className="dd-list-item">Delete Server</button>
            <button className="dd-list-item">Rename Server</button>
            <button className="dd-list-item">Leave Server</button>
          </div>
        </div>
      </div>
    </>,
    document.getElementById("room-section")
  );
};

export default Dropdown;
