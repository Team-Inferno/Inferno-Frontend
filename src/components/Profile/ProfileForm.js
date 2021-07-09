import React,{useState} from "react";

const ProfileForm = (props) => {
  const [email, setEmail] = useState("bean@gmail.com");
  const [username, setUsername] = useState("Mr. Bean");
  return (
    <>
      <div className="profile-form">
        <form>
          <div className="input-area">
            <label htmlFor="email">EMAIL</label>
            <input type="text" name="email" value={email} onChange={e=> setEmail(e.target.value)}/>
          </div>
          <div className="input-area">
            <label htmlFor="username">USERNAME</label>
            <input type="text" name="username" value={username} onChange={e=> setUsername(e.target.value)}/>
          </div>
          <button>save changes</button>
        </form>
      </div>
    </>
  );
};

export default ProfileForm;
