import React from "react";
import ProfileForm from "../../components/profile.component/ProfileForm";
import { useQuery } from "react-query";
import { getUserProfile } from "../../api/user.api";
import useAuthorization from "../../hooks/useAuthorization";
import InviteList from "../../components/invite.component/InviteList";
import "./css/profile.css";

export const Profile = (props) => {
  const { decodeToken } = useAuthorization();

  const userID = decodeToken().id;

  const profileQuery = useQuery(
    ["profile", userID],
    () => {
      return getUserProfile(userID);
    },
    { refetchOnWindowFocus: false }
  );

  //console.log(profileQuery.error?.response);
  //console.log(profileQuery.data);

  return (
    <>
      <div className="profile-body">
        <div className="profile-container">
          <section className="profile">
            <div className="profile-header">
              <div className="profile-img"></div>
              <h1>{profileQuery?.data?.username}</h1>
            </div>
            <div className="profile-details">
              <p>PROFILE DETAILS</p>
              <ProfileForm profile={profileQuery?.data} />
            </div>
          </section>
          <section className="invite-list">
            <p className="invite-header">PENDING INVITES</p>
            <div className="invites">
              {profileQuery?.data?.invites.length > 0 ? (
                <InviteList
                  inviteList={profileQuery.data.invites}
                  userID={profileQuery?.data?.id}
                />
              ) : (
                <>No Invite Available</>
              )}
            </div>
          </section>
        </div>
      </div>
    </>
  );
};
