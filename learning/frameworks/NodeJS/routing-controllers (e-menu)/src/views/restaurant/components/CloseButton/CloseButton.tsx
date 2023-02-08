import React, { FC } from "react";
import classnames from "classnames";

import { ReactComponent as CloseIcon } from "../../assets/icons/close-icon.svg";

import { ICloseButtonProps } from "./types";

import "./style.scss";

const CloseButton: FC<ICloseButtonProps> = ({ className, size, onClick }) => (
  <div className={classnames("close-button", className)}>
    <CloseIcon width={size} height={size} onClick={onClick} />
  </div>
);

CloseButton.defaultProps = {
  size: 32,
};

export default CloseButton;
