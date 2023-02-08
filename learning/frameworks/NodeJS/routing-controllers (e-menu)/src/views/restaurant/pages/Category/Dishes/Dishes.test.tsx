import React from "react";
import { mount } from "enzyme";

import Dishes from "./Dishes";

describe("<Dishes/>", () => {
  it("should mount", () => {
    mount(<Dishes />);
  });
});
