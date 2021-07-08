import React, { useState } from "react";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import CloseIcon from "@material-ui/icons/Close";
import { useSelector } from "react-redux";
import AddRoom from "../AddRoomPopUp/addroom";
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";
import ServerRenameForm from "../RenameServerPopUp/serverrename";
const axios = require("axios");

const CurrentServer = (props) => {

  const [isAddRoomPopUpVisible, setIsAddRoomPopUpVisible] = useState(false);
  const [isServerRenameFormVisible,setIsServerRenameFormVisible] = useState(false);

  const user_id = useSelector((state) => {
    return state.userReducer._id;
  });

  const currentServer = useSelector((state) => {
    return state.serverReducer.currentServer;
  });

  const deleteServer = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:8080/api/server/delete/room", null, {
        params: { server_id: currentServer._id },
      })
      .then((res) => console.log(res.data))
      .catch((error) => console.log(error.response));
  };


  return (
    <div className="server-details">
      <ContextMenuTrigger id="server">
        <div className="current-server">
          <div className="current-server-info">
            <div className="current-server-name">
              <p>{currentServer.server_name}</p>
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

              {currentServer.owner === user_id && (
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

      {isAddRoomPopUpVisible && <AddRoom popUp={setIsAddRoomPopUpVisible} />}
      {isServerRenameFormVisible && (
        <ServerRenameForm popUp={setIsServerRenameFormVisible} />
      )}
    </div>
  );
};

export default CurrentServer;
