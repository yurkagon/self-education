import React from "react";
import { mount } from "enzyme";

import Order from "./Order";

describe("Restaurant page Order", () => {
  it("should mount", () => {
    mount(<Order />);
  });
});
