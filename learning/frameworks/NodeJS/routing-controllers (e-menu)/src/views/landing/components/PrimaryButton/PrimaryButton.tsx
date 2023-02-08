import React, { FC } from "react";

import { IPrimaryButtonProps } from "./types";

import "./styles.scss";

const PrimaryButton: FC<IPrimaryButtonProps> = ({ children }) => (
  <div className="primary-btn">{children}</div>
);
export default PrimaryButton;
