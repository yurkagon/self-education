import React from "react";
import { mount } from "enzyme";

import Page500 from "./Page500";

describe("Restaurant Page500", () => {
  it("should mount", () => {
    mount(<Page500 />);
  });
});
