import axios from "axios";

const addRoom = (data) => {
  return axios.post("http://localhost:8080/api/server/new/room", null, {
    params: {
      room_name: data.roomName,
      server_id: data.serverID,
    },
  });
}

const deleteRoom = (data) => {
  return axios.post("http://localhost:8080/api/server/delete/room", null, {
    params: { server_id: data.server_id, room_id: data.room_id },
  });
};

const renameRoom = (data) => {
  console.log(data);
  return axios.post("http://localhost:8080/api/server/rename/room", null, {
    params: {
      room_name: data.roomName,
      server_id: data.serverID,
      room_id: data.roomID,
    },
  });
};

export { deleteRoom, renameRoom, addRoom };
