import React, { Suspense } from "react";
import { Router, Route, Switch } from "react-router-dom";

import { Landing, Admin, Restaurant } from "./views";

import history from "./history";

import LoadingScreen from "../components/LoadingScreen";

const App = () => (
  <Router history={history}>
    <Suspense fallback={<LoadingScreen />}>
      <Switch>
        <Route path="/admin" component={Admin} />
        <Route path="/r" component={Restaurant} />
        <Route path="/" component={Landing} />
      </Switch>
    </Suspense>
  </Router>
);

export default App;
