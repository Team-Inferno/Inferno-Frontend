import React, { useState } from "react";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import CloseIcon from "@material-ui/icons/Close";
import { useSelector, useDispatch } from "react-redux";
import AddRoom from "../AddRoomPopUp/addroom";
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";
import ServerRenameForm from "../RenameServerPopUp/serverrename";
import {setServerList } from "../../../redux/server.slice";
const axios = require("axios");

const CurrentServer = (props) => {
  const dispatch = useDispatch();
  const [isAddRoomPopUpVisible, setIsAddRoomPopUpVisible] = useState(false);
  const [isServerRenameFormVisible, setIsServerRenameFormVisible] =
    useState(false);

  const user_id = useSelector((state) => {
    return state.userReducer._id;
  });

  const currentServer = props.currentServer;

  const serverList = useSelector((state) => {
    return state.serverReducer.subscribedServers;
  });

  const deleteServer = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:8080/api/server/delete/server", null, {
        params: { server_id: currentServer._id },
      })
      .then((res) => {
        console.log(res.data);
        if (!res.data.error) {
          
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="server-details">
      <ContextMenuTrigger id="server">
        <div className="current-server">
          <div className="current-server-info">
            <div className="current-server-name">
              <p>{currentServer && currentServer.server_name}</p>
            </div>
            {props.openList ? (
              <CloseIcon
                className="top-sidebar-icon"
                onClick={(e) => props.setOpenList(!props.openList)}
              />
            ) : (
              <ExpandMoreIcon
                className="top-sidebar-icon"
                onClick={(e) => props.setOpenList(!props.openList)}
              />
            )}
          </div>
        </div>
      </ContextMenuTrigger>
      {currentServer && (
        <ContextMenu id="server">
          <div className="context">
            <div className="context-wrapper">
              <div role="list" className="context-list">
                <MenuItem data={{ foo: "bar" }}>
                  <button className="context-list-item">Invite People</button>
                </MenuItem>
                <MenuItem data={{ foo: "bar" }}>
                  <button className="context-list-item">Leave Server</button>
                </MenuItem>

                {currentServer && currentServer.owner === user_id && (
                  <>
                    <MenuItem data={{ foo: "bar" }}>
                      <button
                        className="context-list-item"
                        onClick={(e) => setIsAddRoomPopUpVisible(true)}
                      >
                        Create Room
                      </button>
                    </MenuItem>

                    <MenuItem data={{ foo: "bar" }}>
                      <button
                        className="context-list-item"
                        onClick={(e) =>
                          setIsServerRenameFormVisible(
                            !isServerRenameFormVisible
                          )
                        }
                      >
                        Rename Server
                      </button>
                    </MenuItem>
                    <MenuItem data={{ foo: "bar" }}>
                      <button
                        className="context-list-item button-danger"
                        onClick={(e) => deleteServer(e)}
                      >
                        Delete Server
                      </button>
                    </MenuItem>
                  </>
                )}
              </div>
            </div>
          </div>
        </ContextMenu>
      )}

      {isAddRoomPopUpVisible && <AddRoom popUp={setIsAddRoomPopUpVisible} />}
      {isServerRenameFormVisible && (
        <ServerRenameForm popUp={setIsServerRenameFormVisible} />
      )}
    </div>
  );
};

export default CurrentServer;
