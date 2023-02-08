import React from "react";

export default React.lazy(() =>
  import(/* webpackChunkName: "restaurant-500" */ "./Page500")
);
