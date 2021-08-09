import React,{useState} from "react";
import { MenuItem } from "react-contextmenu";
import Loader from "react-loader-spinner";
import { useMutation } from "react-query";
import { deleteRoom } from "../../api/room.api";
import { useQueryClient } from "react-query";
import RoomRenameModal from "./RoomRenameModal";

const RoomContextMenu = (props) => {
  const queryClient = useQueryClient();

  const [roomRenameModalVisible, setRoomRenameModalVisible] = useState(false);

  const { mutate, isLoading, error } = useMutation((data) => deleteRoom(data), {
    retry: 3,
    onSuccess: (res) => {
      queryClient.invalidateQueries(["server", props.serverID]);
    },
  });

  const submitDeleteRoom = (e) => {
    e.preventDefault();
    mutate({
      server_id: props.serverID,
      room_id: props.roomID,
    });
  };

  return (
    <>
      <div className="context">
        <div className="context-wrapper">
          <div role="list" className="context-list">
            <MenuItem data={{ foo: "bar" }}>
              <button
                className="context-list-item"
                onClick={(e) => setRoomRenameModalVisible(true)}
              >
                Rename Room
              </button>
            </MenuItem>

            <MenuItem data={{ foo: "bar" }}>
              <button
                className="context-list-item button-danger"
                onClick={(e) => submitDeleteRoom(e)}
              >
                {isLoading ? (
                  <Loader
                    type="ThreeDots"
                    color="#00BFFF"
                    height={20}
                    width={20}
                    timeout={3000} //3 secs
                  />
                ) : (
                  "Delete Room"
                )}
              </button>
            </MenuItem>

            <MenuItem divider />
          </div>
        </div>
      </div>
      {roomRenameModalVisible && (
        <RoomRenameModal
          roomID={props.roomID}
          serverID={props.serverID}
          visibility={setRoomRenameModalVisible}
        />
      )}
    </>
  );
};

export default RoomContextMenu;
