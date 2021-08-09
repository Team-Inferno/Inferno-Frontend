import axios from "axios";


const getUserProfile = async (userID) => {
  const res = await axios.get(
    process.env.REACT_APP_SERVER + "user/profile",
    {
      params: {
        user_id: userID,
      },
    }
  );
  return res.data;
};

const getUserInvites = async (userID) => {
  const res = await axios.get(
    process.env.REACT_APP_SERVER + "user/invites",
    {
      params: {
        user_id: userID,
      },
    }
  );
  return res.data;
};



const getUserName = async (userID) => {
  //console.log(userID);
  const res = await axios.get(
    process.env.REACT_APP_SERVER + "user/name",
    {
      params: { user_id: userID },
    }
  );
  //console.log(res);
  return res.data;
}

export {
  getUserProfile,
  getUserInvites,
  getUserName, 
};
