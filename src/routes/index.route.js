import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PrivateRoute from './private.route';
import RestrictedRoute from "./restricted.route";
import {Login} from "../pages/Login";
import { Register } from "../pages/Register";
import { Home } from "../pages/Home";
import {Profile} from "../pages/Profile";
import { Server } from '../pages/server';



const Routes = (props) => {
  return (
    <Router>
      <Switch>
        <RestrictedRoute exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <PrivateRoute exact path="/home" component={Home} />
        <PrivateRoute exact path="/profile" component={Profile} />
        <PrivateRoute path="/server/:id" component={Server} />
      </Switch>
    </Router>
  );

 }

export default Routes