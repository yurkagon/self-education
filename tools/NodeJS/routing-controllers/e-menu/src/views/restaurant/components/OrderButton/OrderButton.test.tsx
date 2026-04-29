import React from "react";
import { shallow } from "enzyme";

import OrderButton from "./OrderButton";

describe("<OrderButton />", () => {
  it("should mount", () => {
    shallow(<OrderButton />);
  });
});
