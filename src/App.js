import React from "react";
import "./App.css";
import "./index.css";
import { HashRouter, Switch, Route } from "react-router-dom";

import stats from "./components/stats";
import login from "./components/login";

function App() {
  return (
    <HashRouter>
      <div className="App">
        <Switch>
          <Route path="/stats" component={stats} />
          <Route exact path="/" component={login} />
          <Route path="" component={login} />
        </Switch>
      </div>
    </HashRouter>
  );
}

export default App;
