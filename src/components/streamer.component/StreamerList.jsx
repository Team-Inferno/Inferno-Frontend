import React from "react";
import { useHistory } from "react-router-dom";
import GridList from "react-gridlist";
import StreamerListItem from "./StreamerListItem";

const StreamerList = (props) => {
  const streamerList = props.streamerList;
  const history = useHistory();

  if (streamerList?.length === 0) {
    return <p>Empty.. Mayb You should follow streamers</p>;
  }

  const handleServerSelect = (streamer) => {
    history.push(`/streamer/${streamer}`);
  };

  function getGridGap(elementWidth, windowHeight) {
    if (elementWidth > 720 && windowHeight > 480) {
      return 10;
    } else {
      return 5;
    }
  }

  function getColumnCount() {
    return 4;
  }

  function getItemData(server, columnWidth) {
    return {
      key: server.server_id,
    };
  }

  return (
    <GridList
      items={props.streamerList}
      getGridGap={getGridGap}
      getColumnCount={getColumnCount}
      getItemData={getItemData}
      renderItem={(streamer) => {
        return (
          <div
            className="server-list-col"
            onClick={() => handleServerSelect(streamer)}
          >
            <StreamerListItem streamerID={streamer}/>
          </div>
        );
      }}
    />
  );
};

export default StreamerList;
