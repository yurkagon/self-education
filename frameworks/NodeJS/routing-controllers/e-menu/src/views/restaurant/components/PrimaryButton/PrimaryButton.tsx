import React, { FC } from "react";
import classnames from "classnames";
import Ripples from "react-ripples";

import { IPrimaryButtonProps } from "./types";

import "./style.scss";

const PrimaryButton: FC<IPrimaryButtonProps> = ({
  className,
  onClick,
  children,
  type = "submit",
  disabled,
}) => (
  <Ripples
    className={classnames("primary-button", className)}
    onClick={onClick}
  >
    <button className="w-100 h-100 button" type={type} disabled={disabled}>
      {children}
    </button>
  </Ripples>
);

export default PrimaryButton;
