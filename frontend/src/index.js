import React from "react";
import ReactDOM from "react-dom";
import Dashboard from "./Dashboard";
import "../src/styles.css";

import { BrowserRouter, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Query from "./pages/Query";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Route path="/login" exact component={Login} />
      <Route path="/register" exact component={Register} />
      <Route path="/Dashboard" exact component={Dashboard} />
      <Route path="/query" exact component={Query} />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
