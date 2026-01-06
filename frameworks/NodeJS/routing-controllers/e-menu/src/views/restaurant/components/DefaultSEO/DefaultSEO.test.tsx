import React from "react";
import { shallow } from "enzyme";

import DefaultSEO from "./DefaultSEO";

describe("<DefaultSEO />", () => {
  it("should mount", () => {
    shallow(<DefaultSEO />);
  });
});
