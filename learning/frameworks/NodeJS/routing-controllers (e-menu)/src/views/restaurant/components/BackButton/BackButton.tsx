import React, { FC } from "react";
import classnames from "classnames";
import { goBack } from "../../utils/LinkBack";

import { ReactComponent as ArrowIcon } from "../../assets/icons/arrow_left.svg";

import { IBackButtonProps } from "./types";

import "./style.scss";

const BackButton: FC<IBackButtonProps> = ({ className }) => (
  <div
    className={classnames("back-button", className)}
    onClick={() => goBack()}
  >
    <ArrowIcon className="arrow" />
    <p className="text">Назад</p>
  </div>
);

export default BackButton;
