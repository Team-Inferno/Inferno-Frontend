import React from 'react';

const Invite = (props) => {
  return (
    <div className="invite-box">
      <div className="invite-description">
        <p>
          User Mr.Angular Invites you To The server <span>{"Pussy Cat"}</span>
        </p>
      </div>
      <div className="button-area">
        <button className="invite-accept-button">Accept</button>
        <button className="invite-decline-button">Decline</button>
      </div>
    </div>
  );

 }

export default Invite