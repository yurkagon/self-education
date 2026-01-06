import React from "react";

export default React.lazy(() =>
  import(/* webpackChunkName: "admin-500" */ "./Page500")
);
