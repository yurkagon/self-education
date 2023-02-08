import React, { FC, Fragment } from "react";

import Solution from "./Solution";

import "./styles.scss";

const Solutions: FC<{}> = () => {
  return (
    <Fragment>
      <h1 className="mx-auto my-5 w-50 text-center">
        Ваш вибір - наша пропозиція
      </h1>
      <div className="d-flex flex-column flex-md-row justify-content-between w-75 mx-auto">
        <Solution />
        <Solution />
      </div>
    </Fragment>
  );
};

export default Solutions;
