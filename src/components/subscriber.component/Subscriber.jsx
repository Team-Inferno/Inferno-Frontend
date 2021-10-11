import React, { useContext, useEffect, useRef } from "react";
import { useQuery } from "react-query";
import { getUserName } from "../../api/user.api";
import { PeerContext } from "../../context/PeerContext";

const Subscriber = ({ call, subscriberID }) => {
  const peer = useContext(PeerContext).current;


  console.log(call + subscriberID);

  var audio = useRef();

  const connectToNewUser = (peerID, peer) => {
    console.log("calling..." + peerID);

    navigator.mediaDevices.getUserMedia({ audio: true }).then((localStream) => {
      const call = peer?.call(peerID, localStream);

      call?.on("stream", (remoteStream) => {

        if (audio.current) {
          audio.current.srcObject = remoteStream;

          audio.current.onloadedmetadata = (e) => {
            audio.current.play();
          };
        }
      });

      call?.on("close", () => {
        console.log("left");
      });

      call?.on("error", (err) => {
        console.log(err);
      });
    });

    
  };

  const answerCall = (call) => {
    console.log("answering call");

    navigator.mediaDevices.getUserMedia({ audio: true }).then((localStream) => {
      call.answer(localStream);

      call.on("stream", (remoteStream) => {

        if (audio.current) {
          audio.current.srcObject = remoteStream;

          audio.current.onloadedmetadata = (e) => {
            audio.current.play();
          };
        }
      });
    });

    call.on("close", () => {
      console.log("left");
    });

    call.on("error", (err) => {
      console.log(err);
      call.close();
    });
  };

  useEffect(() => {
    if (call) {
      connectToNewUser(subscriberID, peer);
    }

    peer?.on("call", (call) => {
      answerCall(call);
    });

    peer?.on("error", function (err) {
      console.log(err?.response?.data);
      console.log(err.type);
    });
  }, [subscriberID, call, peer]);

  const userNameQuery = useQuery(
    ["user-name", subscriberID],
    () => {
      return getUserName(subscriberID);
    },
    { refetchOnWindowFocus: false }
  );

  return (
    <div>
      <p>{userNameQuery?.data}</p>
      {call && (
        <div id="audio-grid">
          <audio ref={audio}></audio>
        </div>
      )}
    </div>
  );
};

export default Subscriber;
