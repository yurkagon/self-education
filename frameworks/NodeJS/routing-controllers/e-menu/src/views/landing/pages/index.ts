import staticLazy from "utils/staticLazy";

export default staticLazy(
  () => import(/* webpackChunkName: "landing-home" */ "./Home")
);
