import React, { FC } from "react";
import ReactLoading from "react-loading";

import "./styles.scss";

const LoadingScreen: FC<{}> = () => (
  <div className="loading-screen d-flex justify-content-center align-items-center">
    <ReactLoading
      className="mx-auto"
      type="bubbles"
      color="blue"
      height={100}
      width={100}
    />
  </div>
);

export default LoadingScreen;
