import React from "react";
import "./App.css";
import { store } from "./store.js";
import { Main } from "./views/Main";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./layout/Navbar";

function App() {
  return (
    <div className="App">
      <Navbar />
      <div className="Page-Content">
        <Router>
          <Switch>
            <Route exact path="/">
              <Main store={store} />
            </Route>
          </Switch>
        </Router>
      </div>
    </div>
  );
}

export default App;
