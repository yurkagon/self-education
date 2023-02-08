import React from "react";

export default React.lazy(
  () => import(/* webpackChunkName: "admin-my-restaurant" */ "./MyRestaurant")
);
