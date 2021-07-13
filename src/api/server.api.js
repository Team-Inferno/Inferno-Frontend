import axios from "axios";

const getServerList = async (user_id) => {
  const res = await axios.get("http://localhost:8080/api/user/server", {
    params: { user_id: user_id },
  });
  return res.data.servers;
};

const getCurrentServer = async (server_id) => {
    const res = await axios.get("http://localhost:8080/api/server", {
      params: { server_id: server_id },
    });

    return res.data;
}


export { getServerList, getCurrentServer };
