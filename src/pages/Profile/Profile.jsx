import React from "react";
import ProfileForm from "../../components/profile.component/ProfileForm";
import { useQuery } from "react-query";
import { getUserProfile } from "../../api/user.api";
import useAuthorization from "../../hooks/useAuthorization";
import InviteList from "../../components/invite.component/InviteList";
import { useMutation } from "react-query";
import "./css/profile.css";
import { registerStreamer } from "../../api/streamer.api";
import Loader from "react-loader-spinner";
import { useQueryClient } from "react-query";

export const Profile = (props) => {
  const { decodeToken } = useAuthorization();

  const userID = decodeToken().id;
  const queryClient = useQueryClient();


  const profileQuery = useQuery(
    ["profile", userID],
    () => {
      return getUserProfile(userID);
    },
    { refetchOnWindowFocus: false }
  );

  const { mutate, isLoading, error } = useMutation(
    (data) => registerStreamer(data),
    {
      retry: 3,
      onSuccess: (res) => {
        queryClient.invalidateQueries(["profile", userID]);

      },
      onError: (err) => {
        console.log(err.message);
      },
    }
  );

  return (
    <>
      <div className="profile-body">
        <div className="profile-container">
          <section className="profile">
            <div className="profile-header">
              <div className="profile-img"></div>
              <h1>{profileQuery?.data?.username}</h1>
              {!profileQuery?.data?.streamer && (
                <button
                  id="be-streamer-button"
                  onClick={(e) =>
                    mutate({
                      userID: userID,
                    })
                  }
                >
                  {isLoading ? (
                    <Loader
                      type="ThreeDots"
                      color="#00BFFF"
                      height={20}
                      width={20}
                    />
                  ) : (
                    <p>{"start streaming"}</p>
                  )}
                </button>
              )}
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
