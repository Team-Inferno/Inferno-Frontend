import React from 'react'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PrivateRoute from './private.route';
import Login from "../components/Auth/Login/login";
import Register from "../components/Auth/Register/register";
import Home from "../components/Home/home";
import Landing from "../components/Home/Landing/landing";

const Routes = (props) => {
  return (
    <Router>
      <Switch>
        <Route exact path="/landing" component={Landing} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <PrivateRoute exact path="/" component={Home} />
      </Switch>
    </Router>
  );

 }

export default Routes