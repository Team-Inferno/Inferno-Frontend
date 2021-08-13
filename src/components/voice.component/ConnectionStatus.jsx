import React, { useState, useRef, useEffect, useContext } from "react";
import { useSelector } from "react-redux";
import MicIcon from "@material-ui/icons/Mic";
import MicOffIcon from "@material-ui/icons/MicOff";
import HeadsetIcon from "@material-ui/icons/Headset";
import Headset from "@material-ui/icons/Headset";
import { SocketContext } from "../../context/SocketContext";
import { PeerContext } from "../../context/PeerContext";
import ReactAudioPlayer from "react-audio-player";
import Peer from "peerjs";

const ConnectionStatus = ({ userID }) => {
  var audio = useRef();

  const voiceChannel = useSelector((state) => {
    return state.channelReducer.currentVoiceChannel;
  });

  const socket = useContext(SocketContext);

  useEffect(() => {
    const connectToNewUser = (userID, peer) => {
      console.log("connecting to new User");

      navigator.mediaDevices
        .getUserMedia({ audio: true })
        .then((localStream) => {
          const call = peer.call(userID, localStream);
          call.on("stream", (remoteStream) => {
            console.log("someone is talking..lol");
            if (audio.current) {
              audio.current.srcObject = remoteStream;
            } else {
              audio.src = window.URL.createObjectURL(remoteStream);
            }
            audio.current.onloadedmetadata = (e) => {
              audio.current.play();
            };
          });

          call.on("close", () => {
            console.log("left");
          });
        });
    };

    if (voiceChannel) {
      const peer = new Peer(null);

      peer.on("open", function (id) {
        console.log("My peer ID is: " + id);

        socket.emit("join-voice-channel", {
          channelID: voiceChannel._id,
          userID: id,
        });
      });

      peer?.on("error", function (err) {
        console.log(err?.response?.data);
        console.log(err.type);
      });

      console.log(peer);

      socket.on("voice-channel-left", (userId) => {
        console.log(userId);
      });

      peer.on("call", (call) => {
        navigator.mediaDevices
          .getUserMedia({ audio: true })
          .then((localStream) => {
            call.answer(localStream);

            call.on("stream", (remoteStream) => {
              console.log("someone is talking");
              if (audio.current) {
                audio.current.srcObject = remoteStream;
              }else{
                audio.src = window.URL.createObjectURL(remoteStream);
              }
              audio.current.onloadedmetadata = e => {
                audio.current.play();
              }
            });
          });
      });

      socket.on("voice-channel-joined", (newUser) => {
        console.log("voice connection call" + newUser);
        connectToNewUser(newUser, peer);
      });
    }
  }, [voiceChannel]);

  if (voiceChannel) {
    
    return (
      <>
        <div className="connection-status">
          <div id="audio-grid">
            <audio ref={audio}></audio>
          </div>
          <p>
            connected to <span>{voiceChannel.channel_name}</span>
          </p>
          <div className="voice-options">
            <div className="mute-option">
              <MicIcon />
            </div>
            <div className="deafen-option">
              <Headset />
            </div>
          </div>
        </div>
      </>
    );
  } else {
    return <></>;
  }
};

export default ConnectionStatus;
