import React from "react";
import Subscriber from "./Subscriber";

const SubscriberList = (props) => {
  console.log(props.subscriberList);
  return (
    <div className="subscribers">
      <ul>
        {props.subscriberList.map((subscriber) => {
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
