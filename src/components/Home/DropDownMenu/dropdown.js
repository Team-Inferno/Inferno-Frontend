import React, { useState } from "react";


const Dropdown = (props) => {
  return (
    <>
      <div className="dd-wrapper">
        <div role="list" className="dd-list">
          <button className="dd-list-item">Delete Server</button>
          <button className="dd-list-item">Rename Server</button>
          <button className="dd-list-item">Leave Server</button>
          <button className="dd-list-item">Invite People</button>
        </div>
      </div>
    </>
  );
};

export default Dropdown;
