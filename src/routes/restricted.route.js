import React from "react";
import { Route, Redirect } from "react-router-dom";
import useAuthorization from "../hooks/useAuthorization";

const RestrictedRoute = ({ component: Component, ...rest }) => {
  const { verifyToken } = useAuthorization();

  return (
    <Route
      {...rest}
      render={(props) =>
        verifyToken() ? <Redirect to="/home" /> : <Component {...props} />
      }
    />
  );
};

export default RestrictedRoute;
