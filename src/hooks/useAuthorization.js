import { useState, useEffect,useMemo } from "react";
import jwt_decode from "jwt-decode";
import axios from "axios";

export default function useAuthorization() {

  const getToken = useMemo(() => {
    const userToken = sessionStorage.getItem("token");
    if (userToken) {
      const decoded = jwt_decode(userToken);
      const currentTime = Date.now() / 1000;
      if (decoded.exp > currentTime) {
        console.log("token found");
        return userToken;
      }
    }
    return null;
  }, []);

  const [token, setToken] = useState(getToken);

  const destroyToken = () => {
    sessionStorage.removeItem("token");
    setToken(null);
  };

  const decodeToken = () => {
    if (token) {
      return jwt_decode(token);
    }
    return null;
  };

  useEffect(() => {
    attachTokenToRequest(token);
  }, [token]);

  const saveToken = (t) => {
    sessionStorage.setItem("token", t);
    setToken(t);
  };

  const verifyToken = () => {
    if (token) {
      const userData = jwt_decode(token);
      if (userData.exp > Date.now() / 1000) {
        return true;
      }
    }
    return false;
  };

  const attachTokenToRequest = (token) => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
    } else {
      delete axios.defaults.headers.common["Authorization"];
    }
  };

  return {
    saveToken: saveToken,
    verifyToken: verifyToken,
    decodeToken: decodeToken,
    destroyToken: destroyToken,
  };
}
