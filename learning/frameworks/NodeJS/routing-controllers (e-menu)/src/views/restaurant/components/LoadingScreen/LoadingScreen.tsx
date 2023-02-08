import React, { FC } from "react";
import cn from "classnames";
import ReactLoading from "react-loading";

import "./styles.scss";

import { ILoadingScreenProps } from "./types";

const LoadingScreen: FC<ILoadingScreenProps> = ({ overlay }) => (
  <div
    className={cn(
      "loading-screen",
      "d-flex",
      "justify-content-center",
      "align-items-center",
      { overlay }
    )}
  >
    <ReactLoading
      className="mx-auto"
      type="bubbles"
      color="#FFDA80"
      height={100}
      width={100}
    />
  </div>
);

export default LoadingScreen;
