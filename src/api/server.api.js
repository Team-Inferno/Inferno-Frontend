import axios from "axios";

const getServerList = async (user_id) => {
  const res = await axios.get(process.env.REACT_APP_SERVER + "user/server", {
    params: { user_id: user_id },
  });
  return res.data.servers;
};

const getCurrentServer = async (server_id) => {
  const res = await axios.get(process.env.REACT_APP_SERVER + "server", {
    params: { server_id: server_id },
  });

  return res.data;
};

const addServer = (serverName) => {
  return axios.post(process.env.REACT_APP_SERVER + "server", null, {
    params: {
      server_name: serverName,
    },
  });
};

const getServerName = async (serverID) => {
  const res = await axios.get(process.env.REACT_APP_SERVER + "server/name", {
    params: { server_id: serverID },
  });
  return res.data;
}



export { getServerList, getCurrentServer, addServer, getServerName };
