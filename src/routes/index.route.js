import React from 'react'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PrivateRoute from './private.route';
import Login from "../components/Auth/Login/login";
import Register from "../components/Auth/Register/register";
import Home from "../components/Home/home";
import StreamCreate from '../components/streams/StreamCreate';
import StreamEdit from '../components/streams/StreamEdit';
import StreamDelete from '../components/streams/StreamDelete';
import StreamList from '../components/streams/StreamList';
import StreamShow from '../components/streams/StreamShow';
import Header from '../components/Header';

const Routes = (props) => {
  return (
    <Router>
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <PrivateRoute exact path="/" component={Home} />
        <div>
          <Header />
          <Route path="/streams" exact component={StreamList} />
          <Route path="/streams/create" exact component={StreamCreate} />
          <Route path="/streams/edit" exact component={StreamEdit} />
          <Route path="/streams/delete" exact component={StreamDelete} />
          <Route path="/streams/show" exact component={StreamShow} />
        </div>
      </Switch>
    </Router>
  );

 }

export default Routes