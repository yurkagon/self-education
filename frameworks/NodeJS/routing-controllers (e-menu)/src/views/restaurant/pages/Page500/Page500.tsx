import React, { FC } from "react";
import PrimaryButton from "../../components/PrimaryButton";

import { goBack } from "../../utils/LinkBack";

import { ReactComponent as Oven } from "../../assets/images/oven.svg";

import "./style.scss";

const Page500: FC<{}> = () => (
  <div className="page-container">
    <div className="internal-error-page d-flex flex-column justify-content-center align-items-center">
      <div className="oven">
        <Oven className="oven-img" />
        <div className="text-error d-flex flex-column text-right">
          <h1 className="error">500</h1>
          <p className="main-error-text">
            Прибульці зламали нашу найкращу пічку!
          </p>
          <p className="secondary-error-text">
            (не хвилюйтесь, вона на лікуванні)
          </p>
        </div>
      </div>
      <PrimaryButton className="down" onClick={() => goBack()}>
        Повернутися назад
      </PrimaryButton>
    </div>
  </div>
);

export default Page500;
