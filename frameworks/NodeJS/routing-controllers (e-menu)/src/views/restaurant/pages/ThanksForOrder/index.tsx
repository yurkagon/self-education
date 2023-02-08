import React from "react";

export default React.lazy(() =>
  import(
    /* webpackChunkName: "restaurant-thanks-for-order" */ "./ThanksForOrder"
  )
);
