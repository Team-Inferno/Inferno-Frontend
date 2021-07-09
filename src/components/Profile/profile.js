import React from "react";
import "./profile.css"
import ProfileForm from "./ProfileForm";
import Invite from "./Invite";

const Profile = (props) => {
  return (
    <>
      <div className="profile-body">
        <div className="profile-container">
          <section className="profile">
            <div className="profile-header">
              <div className="profile-img"></div>
              <h1>{"Mr. Bean"}</h1>
            </div>
            <div className="profile-details">
              <p>PROFILE DETAILS</p>
              <ProfileForm />
            </div>
          </section>
          <section className="invite-list">
            <p className="invite-header">PENDING INVITES</p>
            <div className="invites">
              <Invite />
              <Invite />
              <Invite />
              <Invite />
              <Invite />
              <Invite />
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default Profile;
