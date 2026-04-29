import React, { FC } from "react";

import { Link } from "react-router-dom";

import { ReactComponent as Logo } from "../../images/logo.svg";

const Header: FC<{}> = () => (
  <div className="d-flex justify-content-between align-items-end py-5 w-75 mx-auto">
    <Link to="/">
      <Logo className="w-50" />
    </Link>
    <Link to="/admin/login">Sign in</Link>
  </div>
);
export default Header;
