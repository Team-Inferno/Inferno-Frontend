import React, { useContext,useEffect } from "react";
import Subscriber from "./Subscriber";
import Peer from "peerjs";
import { SocketContext } from "../../context/SocketContext";

const SubscriberList = ({ active,channelID, subscriberList, userID }) => {
  const socket = useContext(SocketContext);

  useEffect(() => {

    if(active){
      socket.emit("join-voice-channel", {
        channelID: channelID,
        userID: userID,
      });
    }
    
    return () => {
      
    };
  }, []);

  return (
    <div className="channel-subscribers">
      <ul>
        {subscriberList &&
          subscriberList.map((subscriber, index) => {
            return (
              <li key={subscriber}>
                <Subscriber
                  call={
                    active &&
                    subscriber !== userID &&
                    index > subscriberList.indexOf(userID)
                  }
                  subscriberID={subscriber}
                />
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default SubscriberList;
