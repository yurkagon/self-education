import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import ProtectedRoute from "RootRouter/ProtectedRoute";

import {
  Login,
  Register,
  Page404,
  Page500,
  Home,
  AccountConfirm,
} from "../pages";

import LoadingScreen from "../components/LoadingScreen";

const Router = () => (
  <React.Suspense fallback={<LoadingScreen />}>
    <Switch>
      <ProtectedRoute privateRoute path="/admin/dashboard" component={Home} />
      <ProtectedRoute publicRoute exact path="/admin/login" component={Login} />
      <ProtectedRoute
        publicRoute
        exact
        path="/admin/register"
        component={Register}
      />

      <Route
        exact
        path="/admin/account/confirm/:token"
        component={AccountConfirm}
      />

      <Route exact path="/admin/500" component={Page500} />

      <Redirect exact from="/admin/" to="/admin/dashboard/" />

      <Route component={Page404} />
    </Switch>
  </React.Suspense>
);

export default Router;
