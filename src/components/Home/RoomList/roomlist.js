import React from 'react';
import Room from './Room/room';

const RoomList = (props) => {
  return (
    <>
      <div className="room-list">
        <Room />
        <Room />
        <Room />
        <Room />
        <Room />
      </div>
    </>
  );

 }

export default RoomList;