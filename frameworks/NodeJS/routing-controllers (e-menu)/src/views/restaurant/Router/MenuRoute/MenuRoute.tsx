import React, { FC, Suspense } from "react";
import { Route } from "react-router-dom";

import Header from "../../components/Header";

import WaiterButton from "../../components/WaiterButton";
import OrderButton from "../../components/OrderButton";
import LoadingScreen from "../../components/LoadingScreen";

import { IMenuRouteProps } from "./types";

import "./style.scss";

const MenuRoute: FC<IMenuRouteProps> = ({
  disableBottomNavigation,
  ...props
}) => (
  <div className="menu-route vh-100 min-vh-100">
    <Header />

    <Suspense fallback={<LoadingScreen />}>
      <Route {...props} />
    </Suspense>

    {!disableBottomNavigation && (
      <div className="bottom-navigation">
        <OrderButton />
        <WaiterButton />
      </div>
    )}
  </div>
);

export default MenuRoute;
