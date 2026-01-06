import React, { Suspense } from "react";
import { Switch, Route } from "react-router-dom";

import Home from "../pages/Home";

// TODO: create an landing spinner and put here
const Router = () => (
  <Suspense fallback={null}>
    <Switch>
      <Route exact path="/" component={Home} />

      <Route component={() => <h1>404</h1>} />
    </Switch>
  </Suspense>
);

export default Router;
