import React from "react";
import { Route, Redirect } from "react-router-dom";
import useAuthorization from "../hooks/useAuthorization";


const PrivateRoute = ({ component: Component, ...rest }) => {
  const { verifyToken } = useAuthorization();

  return (
    <Route
      {...rest}
      render={(props) =>
        verifyToken() ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};

export default PrivateRoute;
