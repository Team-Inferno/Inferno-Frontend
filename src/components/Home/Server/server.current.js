import React, { useState, useEffect } from "react";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import CloseIcon from "@material-ui/icons/Close";
import ServerList from "../ServerList/serverlist";
import { useSelector } from "react-redux";
import AddServer from "../AddServerPopUp/addserver";
import AddRoom from "../AddRoomPopUp/addroom";
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";
import ServerRenameForm from "../RenameServerPopUp/serverrename";

const CurrentServer = (props) => {

  const [isAddRoomPopUpVisible, setIsAddRoomPopUpVisible] = useState(false);
  const [isServerRenameFormVisible,setIsServerRenameFormVisible] = useState(false);

  const user_id = useSelector((state) => {
    return state.userReducer._id;
  });

  const serverOwner = useSelector((state) => {
    if (state.serverReducer.currentServer) {
      return state.serverReducer.currentServer.owner;
    } else {
      return null;
    }
  });

  var serverName = useSelector((state) => {
    var server = state.serverReducer.currentServer;
    if (server) {
      return server.server_name;
    }
    return null;
  });


  return (
    <div className="server-details">
      <ContextMenuTrigger id="server">
        <div className="current-server">
          <div className="current-server-info">
            <div className="current-server-name">
              <p>{serverName}</p>
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

              {serverOwner === user_id && (
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
                        setIsServerRenameFormVisible(!isServerRenameFormVisible)
                      }
                    >
                      Rename Server
                    </button>
                  </MenuItem>
                  <MenuItem data={{ foo: "bar" }}>
                    <button className="context-list-item button-danger">
                      Delete Server
                    </button>
                  </MenuItem>
                </>
              )}
            </div>
          </div>
        </div>
      </ContextMenu>

      {isAddRoomPopUpVisible && <AddRoom popUp={setIsAddRoomPopUpVisible} />}
      {isServerRenameFormVisible && (
        <ServerRenameForm popUp={setIsServerRenameFormVisible} />
      )}
    </div>
  );
};

export default CurrentServer;
