import React, { FC } from "react";

import Router from "./Router";

import "./styles.scss";

const App: FC<{}> = () => (
  <div className="landing-view">
    <Router />
  </div>
);

export default App;
