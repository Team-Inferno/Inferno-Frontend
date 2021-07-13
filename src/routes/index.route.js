import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PrivateRoute from './private.route';
import {Login} from "../pages/Login";
import { Register } from "../pages/Register";
import { Home } from "../pages/Home";
import Profile from "../components/Profile/profile";

const Routes = (props) => {
  return (
    <Router>
      <Switch>
        <Route exact path="/profile" component={Profile} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <PrivateRoute exact path="/home" component={Home} />
      </Switch>
    </Router>
  );

 }

export default Routes