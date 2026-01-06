import React, { FC } from "react";
import { Route, Redirect } from "react-router-dom";
import { observer } from "mobx-react";

import UserStore from "stores/UserStore";

import { IProtectedRouteProps } from "./types";

const ProtectedRoute: FC<IProtectedRouteProps> = ({
  publicRoute,
  privateRoute,
  ...props
}) => {
  if (privateRoute && !UserStore.isDataExist) {
    return <Redirect to="/admin/login" />;
  }
  if (publicRoute && UserStore.isDataExist) {
    return <Redirect to="/admin/dashboard" />;
  }

  return <Route {...props} />;
};

export default observer(ProtectedRoute);
