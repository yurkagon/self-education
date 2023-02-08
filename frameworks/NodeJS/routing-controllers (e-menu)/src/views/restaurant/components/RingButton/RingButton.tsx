import React, { FC } from "react";
import Ripples from "react-ripples";

import { ReactComponent as RingIcon } from "../../assets/icons/Ring.svg";

import { IRingButtonProps } from "./types";

import "./style.scss";

const RingButton: FC<IRingButtonProps> = ({ onClick }) => (
  <div className="bell-icon">
    <Ripples
      className="background"
      onClick={onClick}
      color="rgba(255, 255, 255, 0.5)"
    >
      <RingIcon />
    </Ripples>
  </div>
);

export default RingButton;
