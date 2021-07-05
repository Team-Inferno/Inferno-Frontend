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
                <Room props={room}/>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default RoomList;
