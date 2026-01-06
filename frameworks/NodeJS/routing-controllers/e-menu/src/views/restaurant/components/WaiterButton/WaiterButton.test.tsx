import React from "react";
import { shallow } from "enzyme";

import WaiterButton from "./WaiterButton";

describe("<CallWaiterModal />", () => {
  it("should mount", () => {
    shallow(<WaiterButton />);
  });
});
