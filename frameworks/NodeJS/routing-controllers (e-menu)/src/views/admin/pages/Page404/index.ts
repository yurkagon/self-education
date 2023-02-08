import React from "react";

export default React.lazy(() =>
  import(/* webpackChunkName: "admin-404" */ "./Page404")
);
