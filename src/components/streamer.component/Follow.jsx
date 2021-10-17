import React from "react";
import useAuthorization from "../../hooks/useAuthorization";
import { useQuery, useMutation } from "react-query";
import {
  isFollowing,
  followStreamer,
  unfollowStreamer,
} from "../../api/streamer.api";
import Loader from "react-loader-spinner";
import { useQueryClient } from "react-query";

const Follow = ({ id }) => {
  const { decodeToken } = useAuthorization();
  const currentUser = decodeToken();
  const queryClient = useQueryClient();

  const followerQuery = useQuery(
    ["follower", currentUser.id, id],
    () => {
      return isFollowing({ streamerID: id, userID: currentUser.id });
    },
    { refetchOnWindowFocus: false }
  );

  const followMutation = useMutation(
    (data) => followStreamer(data),
    {
      retry: 3,
      onSuccess: (res) => {
        queryClient.invalidateQueries("follower", id);
      },
    }
  );

  const unfollowMutation = useMutation((data) => unfollowStreamer(data), {
    retry: 3,
    onSuccess: (res) => {
      queryClient.invalidateQueries("follower", id);
    },
  });

  const handleFollow = () => {
    followMutation.mutate({
      streamerID: id,
      userID: currentUser.id,
    });
  };

  const handleUnfollow = () => {
    unfollowMutation.mutate({
      streamerID: id,
      userID: currentUser.id,
    });
  };

  return (
    <>
      {currentUser.id === id ? (
        <></>
      ) : !followerQuery?.data ? (
        <div className="follow-button">
          <button onClick={() => handleFollow()}>
            {followMutation.isLoading ? (
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
      ) : (
        <div className="follow-button">
          <button onClick={() => handleUnfollow()}>
            {unfollowMutation.isLoading ? (
              <Loader
                type="ThreeDots"
                color="#00BFFF"
                height={5}
                width={20}
                timeout={3000} //3 secs
              />
            ) : (
              <>unfollow</>
            )}
          </button>
        </div>
      )}
    </>
  );
};

export default Follow;
