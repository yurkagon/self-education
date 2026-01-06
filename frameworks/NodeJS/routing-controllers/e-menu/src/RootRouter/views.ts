import React from "react";
import staticLazy from "utils/staticLazy";

export const Landing = staticLazy(
  () => import(/* webpackChunkName: "landing" */ "../views/landing")
);
export const Admin = React.lazy(
  () => import(/* webpackChunkName: "admin" */ "../views/admin")
);
export const Restaurant = React.lazy(
  () => import(/* webpackChunkName: "restaurant" */ "../views/restaurant")
);
