import React, { useContext, useEffect } from "react";
import useAuthorization from "../../hooks/useAuthorization";
import { SocketContext } from "../../context/SocketContext";
import { useQuery, useQueryClient } from "react-query";
import { isStreaming, setStreamKey } from "../../api/streamer.api";
import { useMutation } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { setCreateStreamModal } from "../../redux/modal.slice";
import CreateStreamModal from "./CreateStreamModal";

const Stream = ({ id }) => {
  const dispatch = useDispatch();
  const createStreamModalVisibility = useSelector((state) => {
    return state.modalReducer.createStreamModal;
  });
  const { decodeToken } = useAuthorization();
  const currentUser = decodeToken();
  const socket = useContext(SocketContext);
  const queryClient = useQueryClient();

  useEffect(() => {
    socket.on("stream-started", (streaming_id) => {
      queryClient.invalidateQueries("streaming", id);
    });
    socket.on("stream-ended", (streamer_id) => {
      queryClient.invalidateQueries("streaming", id);
    });
    return () => {
      socket.off("stream-ended", (streamer_id) => {
        queryClient.invalidateQueries("streaming", id);
      });
      socket.off("stream-started", (streaming_id) => {
        queryClient.invalidateQueries("streaming", id);
      });
    };
  }, [id, socket, queryClient]);

  const { mutate } = useMutation((data) => setStreamKey(data), {
    retry: 3,
    onSuccess: (res) => {
      console.log("stream-ended");
      queryClient.invalidateQueries("streaming", id);
      socket.emit("end-stream", { streamer_id: id });
    },
  });

  const streamingQuery = useQuery(
    ["streaming", id],
    () => {
      return isStreaming(id);
    },
    { refetchOnWindowFocus: false }
  );

  const startStream = () => {
    dispatch(setCreateStreamModal(true));
    queryClient.invalidateQueries("streaming", id);
  };

  return (
    <>
      {currentUser.id === id &&
        (!streamingQuery.data ? (
          <div className="stream-button">
            <button onClick={() => startStream()}>start stream</button>
          </div>
        ) : (
          <div className="stream-button">
            <button onClick={() => mutate({ streamerID: id, streamKey: null })}>
              end stream
            </button>
          </div>
        ))}
      {createStreamModalVisibility && <CreateStreamModal streamerID={id} />}
    </>
  );
};

export default Stream;
