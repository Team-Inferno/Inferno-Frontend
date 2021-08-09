import React from "react";
import { useHistory } from "react-router-dom";
import {useDispatch} from "react-redux";
import { setCurrentTextChannel } from "../../redux/channel.slice";

const ServerList = (props) => {
  const serverList = props.serverList;
  const history = useHistory();
  const dispatch = useDispatch();

  if (serverList?.length === 0) {
    return <p>Empty.. Mayb You should create a server</p>;
  }

  const handleServerSelect = (server) => {
    dispatch(setCurrentTextChannel(null))
    history.push(`/server/${server.server_id}`);
  };

  return (
    <ul>
      {props.serverList?.map((server) => {
        return (
          <li
            className="server-list-item"
            key={server.server_id}
            onClick={(e) => handleServerSelect(server)}
          >
            <div className="server-list-item-logo">
              {server.server_img ? <img src="" alt="server img" /> : <></>}
            </div>
            <p>{server.server_name}</p>
          </li>
        );
      })}
    </ul>
  );
};

export default ServerList;
