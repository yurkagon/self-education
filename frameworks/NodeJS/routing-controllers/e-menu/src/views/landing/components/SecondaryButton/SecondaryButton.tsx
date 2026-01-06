import React, { FC } from "react";

import { ISecondaryButtonProps } from "./types";

import "./styles.scss";

const SecondaryButton: FC<ISecondaryButtonProps> = ({ children }) => (
  <div className="secondary-btn">{children}</div>
);
export default SecondaryButton;
