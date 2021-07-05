import React, { useState, useEffect } from "react";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import CloseIcon from "@material-ui/icons/Close";
import Dropdown from "../DropDownMenu/dropdown";
import ServerList from "../ServerList/serverlist";
import { useSelector } from "react-redux";
import AddServer from "../AddServerPopUp/addserver";
import AddRoom from "../AddRoomPopUp/addroom";

const CurrentServer = (props) => {
  const [isOptionListOpen, setIsOptionListOpen] = useState(false);
  const [isServerListOpen, setIsServerListOpen] = useState(false);
  const [addServerPopUp, setAddServerPopUp] = useState(false);
  const [addRoomPopUp, setAddRoomPopUp] = useState(false);

  var serverName = useSelector((state) => {
    var server = state.serverReducer.currentServer;
    if (server) {
      return server.server_name;
    }
    return "";
  });
  useEffect(() => {
    document.addEventListener("contextmenu", (e) => {
      //e.preventDefault();
      setIsOptionListOpen(false);
    });
    document.body.addEventListener("click", function (e) {
      setIsOptionListOpen(false);
      setIsServerListOpen(false);
    });
    return () => {
      document.body.removeEventListener("click", function (e) {
        setIsOptionListOpen(false);
        setIsServerListOpen(false);
      });
    };
  }, []);

  const handleServerOptions = (e) => {
    e.preventDefault();
    if (e.type === "contextmenu") {
      setIsOptionListOpen(!isOptionListOpen);
    }
    e.stopPropagation();
  };

  const handleServerList = (e) => {
    e.preventDefault();
    if (e.type === "click") {
      setIsServerListOpen(!isServerListOpen);
    }
    e.stopPropagation();
  };

  return (
    <>
      <div
        className="current-server"
        onContextMenu={(e) => handleServerOptions(e)}
      >
        <div className="current-server-info">
          <div className="current-server-name">
            <p>{serverName}</p>
          </div>
          {isServerListOpen ? (
            <CloseIcon
              className="top-sidebar-icon"
              onClick={(e) => handleServerList(e)}
            />
          ) : (
            <ExpandMoreIcon
              className="top-sidebar-icon"
              onClick={(e) => handleServerList(e)}
            />
          )}
        </div>
      </div>
      {isOptionListOpen && <Dropdown popUp={setAddRoomPopUp}/>}
      {isServerListOpen && <ServerList popUp={setAddServerPopUp} />}
      {addServerPopUp && <AddServer popUp={setAddServerPopUp} />}
      {addRoomPopUp && <AddRoom popUp={setAddRoomPopUp} />}
    </>
  );
};

export default CurrentServer;
