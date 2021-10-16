import React from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCurrentTextChannel } from "../../redux/channel.slice";
import { Container, Row, Col } from "react-grid-system";
import GridList from "react-gridlist";

const ServerList = (props) => {
  const serverList = props.serverList;
  const history = useHistory();
  const dispatch = useDispatch();

  if (serverList?.length === 0) {
    return <p>Empty.. Mayb You should create a server</p>;
  }

  const handleServerSelect = (server) => {
    dispatch(setCurrentTextChannel(null));
    history.push(`/server/${server.server_id}`);
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
      key: server.server_id
    };
  }

  return (
    <GridList
      items={props.serverList}
      getGridGap={(getGridGap)}
      getColumnCount={getColumnCount}
      getItemData={getItemData}
      renderItem={(server) => {
        return (
          <div
            className="server-list-col"
            onClick={() => handleServerSelect(server)}
          >
            <div className="list-item">
              <div className="server-list-item-logo">
                {server.server_img ? (
                  <img src="" alt="server img" />
                ) : (
                  <div className="profile-picture"></div>
                )}
              </div>
              <p>{server.server_name}</p>
            </div>
          </div>
        );
      }}
    />
  );
};

export default ServerList;
