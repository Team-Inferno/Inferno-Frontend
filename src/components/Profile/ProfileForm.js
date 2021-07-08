import React from "react";

const ProfileForm = (props) => {
  return (
    <>
      <div className="profile-form">
        <form>
          <div className="input-area">
            <label htmlFor="email" className="input-label">EMAIL</label>
            <input type="text" name="email" className="input-field"/>
          </div>
          <div className="input-area">
            <label htmlFor="username" className="input-label">USERNAME</label>
            <input type="text" name="username" className="input-field" />
          </div>
        </form>
      </div>
    </>
  );
};

export default ProfileForm;
