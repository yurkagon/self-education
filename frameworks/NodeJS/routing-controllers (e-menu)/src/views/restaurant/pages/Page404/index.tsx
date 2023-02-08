import React from "react";

export default React.lazy(() =>
  import(/* webpackChunkName: "restaurant-404" */ "./Page404")
);
