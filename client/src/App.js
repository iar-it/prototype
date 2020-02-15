import React from "react";
import "./App.css";
import { store } from "./store.js";
import { Home } from "./views/home/";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import Navbar from "./layout/Navbar";

function App() {
  return (
    <div className="App">
      <Navbar />
      <div className="Page-Content">
        <Router>
          <Switch>
            <Route exact path="/">
              <Home store={store} />
            </Route>
          </Switch>
        </Router>
      </div>
    </div>
  );
}

export default App;
