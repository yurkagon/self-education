import React from "react";
import { mount } from "enzyme";

import Cart from "./Cart";

describe("Restaurant page Cart", () => {
  it("should mount", () => {
    mount(<Cart />);
  });
});
