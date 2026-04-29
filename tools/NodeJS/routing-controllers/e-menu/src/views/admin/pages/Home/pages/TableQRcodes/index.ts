import React from "react";

export default React.lazy(
  () => import(/* webpackChunkName: "admin-table-codes" */ "./TableQRcodes")
);
