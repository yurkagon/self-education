import React, { FC } from "react";

import { ReactComponent as Shevron } from "../../assets/icons/shevron.svg";
import { ReactComponent as UkranianFlag } from "../../assets/icons/flags/ua.svg";

import "./style.scss";

const Language: FC<{}> = () => (
  <div className="lang">
    <span>
      <Shevron />
    </span>
    <span className="text">ua</span>
    <span className="flag">
      <UkranianFlag />
    </span>
  </div>
);

export default Language;
