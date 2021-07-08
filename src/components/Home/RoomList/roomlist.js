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
          {rooms && rooms.map((room) => {
            return (
              <li key={room._id}>
                <Room room={room} currentServerID={props.currentServerID} />
              </li>
            );
          })}
        </ul>
        {rooms && rooms.length === 0 && (
          <div className="empty-room-message">
            <p>Create Room Based on topics</p>
          </div>
        )}
      </div>
    </>
  );
};

export default RoomList;
