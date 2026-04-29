import React, { FC } from "react";
import { Helmet } from "react-helmet";
import { observer } from "mobx-react";

import RestaurantStore from "stores/RestaurantStore";

const DefaultSEO: FC<{}> = () => (
  <Helmet>
    <title>{RestaurantStore.name}</title>
  </Helmet>
);

export default observer(DefaultSEO);
