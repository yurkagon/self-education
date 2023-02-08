import React from "react";
import { shallow } from "enzyme";

import Extras from "./Extras";

describe("Restaurant page Extras", () => {
  it("should mount", () => {
    shallow(<Extras />);
  });
});
