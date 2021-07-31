import React from "react";
import Channel from "./Channel";

const ChannelList = (props) => {
  const channels = props.channels;
  return (
    <div className="channel-list">
      <ul>
        {channels.map((channel) => {
          return (
            <li key={channel._id}>
              <Channel
                channel={channel}
                roomID={props.roomID}
                serverID={props.serverID}
                owner={props.owner}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ChannelList;
