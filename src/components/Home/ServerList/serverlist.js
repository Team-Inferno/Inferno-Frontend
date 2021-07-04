import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

const ServerList = (props) => {
  var initial = [
    {
      id: 1,
      server_name: "Inferno",
      server_logo: null,
    },
    {
      id: 2,
      server_name: "Laugh Tales",
      server_logo: null,
    },
    {
      id: 3,
      server_name: "Leggo",
      server_logo: null,
    },
    {
      id: 4,
      server_name: "Hoi-choi",
      server_logo: null,
    },
    {
      id: 5,
      server_name: "Hoi-choi",
      server_logo: null,
    },
    {
      id: 6,
      server_name: "Hoi-choi",
      server_logo: null,
    },
    {
      id: 7,
      server_name: "Hoi-choi",
      server_logo: null,
    },
    {
      id: 8,
      server_name: "Hoi-choi",
      server_logo: null,
    },
    {
      id: 9,
      server_name: "Hoi-choi",
      server_logo: null,
    },
    {
      id: 10,
      server_name: "Hoi-choi",
      server_logo: null,
    },
    {
      id: 11,
      server_name: "Hoi-choi",
      server_logo: null,
    },
    {
      id: 12,
      server_name: "Hoi-choi",
      server_logo: null,
    },
    {
      id: 13,
      server_name: "Hoi-choi",
      server_logo: null,
    },
    {
      id: 14,
      server_name: "Hoi-choi",
      server_logo: null,
    },
    {
      id: 15,
      server_name: "Hoi-choi",
      server_logo: null,
    },
    {
      id: 16,
      server_name: "Hoi-choi",
      server_logo: null,
    },
    {
      id: 17,
      server_name: "Hoi-choi",
      server_logo: null,
    },
  ];
  useEffect(() => {
    console.log(serverList);
  });

  const [serverList, setServerList] = useState(initial);

  return ReactDOM.createPortal(
    <>
      <div className="server-list-dropdown">
        <div className="server-list-container">
          <div className="server-list">
            <ul>
              {serverList.map((item) => {
                return (
                  <li className="server-list-item" key={item.id}>
                    <div className="server-list-item-logo">
                      {item.server_logo ? (
                        item.server_logo
                      ) : (
                        <AccountCircleIcon />
                      )}
                    </div>
                    <div className="server-list-item-name">
                      {item.server_name}
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </>,
    document.getElementById("room-section")
  );
};

export default ServerList;
