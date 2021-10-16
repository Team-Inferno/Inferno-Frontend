import React from "react";
import useAuthorization from "../../hooks/useAuthorization";
import { useQuery, useMutation } from "react-query";
import { isFollowing, followStreamer } from "../../api/streamer.api";
import Loader from "react-loader-spinner";

const Follow = ({ id }) => {
  const { decodeToken } = useAuthorization();
  const currentUser = decodeToken();

  const followerQuery = useQuery(
    ["follower", currentUser.id, id],
    () => {
      return isFollowing({ streamerID: id, userID: currentUser.id });
    },
    { refetchOnWindowFocus: false }
  );

  const { mutate, isLoading, error } = useMutation(
    (data) => followStreamer(data),
    {
      retry: 3,
      onSuccess: (res) => {},
    }
  );

  const handleFollow = () => {
    mutate({
      streamerID: id,
      userID: currentUser.id,
    });
  };

  return (
    <>
      {currentUser.id === id ? (
        <></>
      ) : (
        !followerQuery?.data && (
          <div className="follow-button">
            <button onClick={() => handleFollow()}>
              {isLoading ? (
                <Loader
                  type="ThreeDots"
                  color="#00BFFF"
                  height={5}
                  width={20}
                  timeout={3000} //3 secs
                />
              ) : (
                <>follow</>
              )}
            </button>
          </div>
        )
      )}
    </>
  );
};

export default Follow;
