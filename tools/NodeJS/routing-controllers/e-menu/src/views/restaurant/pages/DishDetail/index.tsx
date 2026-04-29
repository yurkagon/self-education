import React from "react";

export default React.lazy(() =>
  import(/* webpackChunkName: "restaurant-dish-detail" */ "./DishDetail")
);
