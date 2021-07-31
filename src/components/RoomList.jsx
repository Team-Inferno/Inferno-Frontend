import React from "react";
import Room from "./Room";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import { setAddRoomModal } from "../redux/modal.slice";
import { useSelector, useDispatch } from "react-redux";
import AddRoomModal from "./AddRoomModal";

const RoomList = (props) => {
  const roomList = props.roomList;

  const dispatch = useDispatch();

  const addRoomModelVisible = useSelector((state) => {
    return state.modalReducer.addRoomModal;
  });

  return (
    <>
      <div className="rooms">
        <div className="room-list-header">
          <h3>All Rooms</h3>
          <button
            id="create-room-button"
            onClick={() => dispatch(setAddRoomModal(true))}
          >
            <AddCircleIcon fontSize="default" />
            <p> Create Room</p>
          </button>
        </div>
        <div className="room-list-body">
          {roomList.length === 0 ? (
            <p className="empty-server-msg">
              Empty.. Mayb You should create some rooms of your interests
            </p>
          ) : (
            <ul className="room-list">
              {roomList &&
                roomList.map((room) => {
                  return (
                    <li key={room._id}>
                      <Room
                        owner={props.owner}
                        serverID={props.serverID}
                        room={room}
                      />
                    </li>
                  );
                })}
            </ul>
          )}
        </div>
      </div>

      {addRoomModelVisible && <AddRoomModal serverID={props.serverID} />}
    </>
  );
};

export default RoomList;
