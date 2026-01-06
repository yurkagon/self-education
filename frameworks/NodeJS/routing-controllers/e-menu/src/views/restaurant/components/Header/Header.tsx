import React, { FC } from "react";

import Sidebar from "../Sidebar";

// import Language from "./Language";
import Location from "./Location";

import "./style.scss";

const Header: FC<{}> = () => (
  <div className="header">
    <div className="header-container">
      <Sidebar />
      <Location />
      {/* <Language /> */}
    </div>
  </div>
);

export default Header;
