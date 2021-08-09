import axios from "axios";
import qs from "qs";


const login = (userData) => {
  const data = qs.stringify({
    email: userData.email,
    password: userData.password,
  });
  return axios.post(
    process.env.REACT_APP_SERVER + "auth/login",
    data
  );
};

const register = (userData) => {
  const data = qs.stringify({
    email: userData.email,
    username: userData.username,
    password: userData.password,
  });
  return axios.post(
    process.env.REACT_APP_SERVER + "auth/register",
    data
  );
};

const setUser = (data) => {

}

export {login,register,setUser}
