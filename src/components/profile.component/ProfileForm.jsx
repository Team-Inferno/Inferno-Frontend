import React, { useState, useEffect } from "react";

const ProfileForm = (props) => {
  
  const [email, setEmail] = useState(props.profile?.email);
  const [username, setUsername] = useState(props.profile?.username);

  useEffect(() => {
    setEmail(props.profile?.email);
    setUsername(props.profile?.username);
  }, [props]);

  return (
    <>
      <div className="profile-form">
        <form>
          <div className="input-area">
            <label htmlFor="email">EMAIL</label>
            <input
              type="text"
              name="email"
              value={email? email:""}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="input-area">
            <label htmlFor="username">USERNAME</label>
            <input
              type="text"
              name="username"
              value={username? username: ""}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <button>save changes</button>
        </form>
      </div>
    </>
  );
};

export default ProfileForm;
