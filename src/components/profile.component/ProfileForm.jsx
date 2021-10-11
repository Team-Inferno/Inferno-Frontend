import React, { useState, useEffect } from "react";
import { useMutation } from "react-query";
import {setUserName} from "../../api/user.api"
import Loader from "react-loader-spinner";
import {  useQueryClient } from "react-query";

const ProfileForm = ({profile}) => {
  
  const [username, setUsername] = useState(profile?.username);
  const queryClient = useQueryClient();


  useEffect(() => {
    setUsername(profile?.username);
  }, [profile]);

  const { mutate, isLoading, error } = useMutation(
    (data) => setUserName(data),
    {
      retry: 3,
      onSuccess: (res) => {
        console.log(res);
        queryClient.invalidateQueries(["profile", profile.id]);
      },
      onError: (err) => {
        console.log(err.message);
      },
    }
  );

  const submitForm = e => {
    e.preventDefault();
    console.log("gg")

    mutate({
      userID: profile.id,
      userName: username
    })
  }

  return (
    <>
      <div className="profile-form">
        <form>
          <div className="input-area">
            <label htmlFor="email">EMAIL</label>
            <input
              type="text"
              name="email"
              readOnly
              value={profile ? profile.email : ""}
            />
          </div>
          <div className="input-area">
            <label htmlFor="username">USERNAME</label>
            <input
              type="text"
              name="username"
              value={username ? username : ""}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <button onClick={(e) => submitForm(e)}>
            {isLoading ? (
              <Loader type="ThreeDots" color="#00BFFF" height={20} width={20} />
            ) : (
              "save changes"
            )}
          </button>
        </form>
      </div>
    </>
  );
};

export default ProfileForm;
