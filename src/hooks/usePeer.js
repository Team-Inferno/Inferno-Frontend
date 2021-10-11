import Peer from "peerjs";
import React, { useState,useEffect } from "react";

const usePeer = (props) => {
  const [peer] = useState(new Peer());

  useEffect(() => {

    
      
      return () => {
          
      };
  }, []);

  return <div>usePeer</div>;
};

export default usePeer;
