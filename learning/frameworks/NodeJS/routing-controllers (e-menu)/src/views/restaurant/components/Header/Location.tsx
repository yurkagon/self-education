import React, { FC } from "react";
import { observer } from "mobx-react";

import RestaurantStore from "stores/RestaurantStore";

import { ReactComponent as Logotype } from "../../assets/icons/Logo.svg";

const Location: FC<{}> = () => (
  <div className="brand">
    <span className="brand__logo">
      <Logotype />
    </span>
    <span className="brand__title">
      <h1>{RestaurantStore.name}</h1>
      {/* <p>Столик №4</p> */}
    </span>
  </div>
);

export default observer(Location);
