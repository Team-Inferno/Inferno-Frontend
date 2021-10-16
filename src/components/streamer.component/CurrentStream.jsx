import React, { useState, useEffect, useRef, useContext } from "react";
import { useQuery } from "react-query";
import { isStreaming } from "../../api/streamer.api";
import flv from "flv.js";
import { SocketContext } from "../../context/SocketContext";
import { useQueryClient } from "react-query";

const CurrentStream = ({ id }) => {
  const [streamID, setStreamID] = useState();
  var video = useRef();
  const socket = useContext(SocketContext);
  const queryClient = useQueryClient();

  const streamingQuery = useQuery(
    ["streaming", id],
    () => {
      return isStreaming(id);
    },
    { refetchOnWindowFocus: false }
  );

  useEffect(() => {
    if (streamID) {
      buildPlayer(streamID);
    }
    return () => {};
  }, [streamID]);

  useEffect(() => {
    socket.on("stream-started", (streaming_id) => {
      setStreamID(streaming_id);
    });
    socket.on("stream-ended", (streamer_id) => {
      queryClient.invalidateQueries("streaming", id);
      setStreamID(null);
    });
    return () => {
      socket.off("stream-ended", (streamer_id) => {
        queryClient.invalidateQueries("streaming", id);
      });
      socket.off("stream-started", (streaming_id) => {
        setStreamID(streaming_id);
        setStreamID(null);
      });
    };
  }, [id, socket, queryClient]);

  useEffect(() => {
    if (streamingQuery.data) {
      setStreamID(streamingQuery.data);
    }
    return () => {};
  }, [streamingQuery.data]);

  const buildPlayer = (streaming_id) => {
    const player = flv.createPlayer({
      type: "flv",
      url: `http://localhost:8282/live/${streaming_id}.flv`,
    });
    player.attachMediaElement(video.current);
    player.load();
  };

  return (
    <div className="current-stream">
      {streamID? (
        <div>
          <video ref={video} style={{ width: "100%" }} controls={true} />
        </div>
      ) : (
        <p>No current stream</p>
      )}
    </div>
  );
};

export default CurrentStream;
