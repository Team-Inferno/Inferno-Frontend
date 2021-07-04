import React from "react";
import ReactDOM from "react-dom";
import store from "./store";
import { Provider } from "react-redux";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import AppProviders from "./AppProviders";

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <AppProviders>
       <App/>
     </AppProviders>,
    </React.StrictMode>
  </Provider>,
  document.getElementById("root")
);

reportWebVitals();
