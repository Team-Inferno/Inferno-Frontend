import React from "react";
import Room from "./Room/room";
import { useSelector } from "react-redux";

const RoomList = (props) => {
  var rooms = useSelector((state) => {
    var server = state.serverReducer.currentServer;
    if (server) {
      return server.rooms;
    }
    return [];
  });

  return (
    <>
      <div className="room-list">
        <ul>
          {rooms.map((room) => {
            return (
              <li key={room._id}>
                <Room room={room} currentServerID={props.currentServerID}/>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default RoomList;
