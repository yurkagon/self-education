import React, { FC } from "react";

import "./styles.scss";
import PrimaryButton from "../../../components/PrimaryButton";

const GetStarted: FC<{}> = () => {
  return (
    <div className="get-started w-100 d-flex flex-column justify-content-center align-items-center p-5">
      <h1 className="text-center mb-4">Готові розпочати?</h1>
      <PrimaryButton>Get started</PrimaryButton>
    </div>
  );
};

export default GetStarted;
