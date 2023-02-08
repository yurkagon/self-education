import React, { FC, Fragment } from "react";

import UserForm from "./UserForm";
import PasswordForm from "./PasswordForm";

const MyProfile: FC<{}> = () => (
  <Fragment>
    <UserForm />
    <PasswordForm />
  </Fragment>
);

export default MyProfile;
