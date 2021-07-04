import React from "react";
import "./App.css";
import Home from "./components/Home/home";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Landing from "./pages/Landing"
import Login from "./components/Auth/Login/login";
import Register from "./components/Auth/Register/register";


function App() {
  return (
    <Router>
      <div className="app">
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
