import axios from "axios";

const setTokenInHeader = (token) => {
  if (token) {
    // Apply authorization token to every request if logged in
    axios.defaults.headers.common["Authorization"] = "Bearer "+ token;
    console.log(axios.defaults.headers.common["Authorization"]);
  } else {
    // Delete auth header
    delete axios.defaults.headers.common["Authorization"];
  }
};


export default setTokenInHeader;
