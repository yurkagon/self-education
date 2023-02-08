import React, { Suspense } from "react";
import { Switch, Route } from "react-router-dom";

import MenuRouter from "./MenuRouter";

import { Page404, ThanksForOrder } from "../pages";

import LoadingScreen from "../components/LoadingScreen";

const Router = () => (
  <Suspense fallback={<LoadingScreen />}>
    <Switch>
      <Route
        exact
        path="/r/qr/:qrtoken"
        component={() => <h1>page for qr code verifying</h1>}
      />
      <Route path="/r/page/tfo" component={ThanksForOrder} />

      <Route path="/r/:restaurant_slug" component={MenuRouter} />

      <Route path="/r" component={Page404} />
    </Switch>
  </Suspense>
);

export default Router;
