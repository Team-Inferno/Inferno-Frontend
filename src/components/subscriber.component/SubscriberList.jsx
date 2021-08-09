import React from "react";
import Subscriber from "./Subscriber";

const SubscriberList = ({ subscriberList }) => {
  //console.log(subscriberList);
  return (
    <div className="channel-subscribers">
      <ul>
        {subscriberList.map((subscriber) => {
          return (
            <li key={subscriber}>
              <Subscriber subscriberID={subscriber} />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default SubscriberList;
