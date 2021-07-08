import React from "react";
import "./profile.css"
import ProfileForm from "./ProfileForm";
const Profile = (props) => {
  return (
    <>
      <div className="profile-body">
        <div className="profile-container">
          <div className="profile-header">
            <div className="profile-img"></div>
            <h1>{"Mr. Bean"}</h1>
          </div>
          <section className="profile-details">
            <p>PROFILE DETAILS</p>
            <ProfileForm />
          </section>
          <section className="invite-list">
              
          </section>
        </div>
      </div>
    </>
  );
};

export default Profile;
