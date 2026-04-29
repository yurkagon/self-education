import React from "react";
import { mount } from "enzyme";
import { StaticRouter } from "react-router-dom";

import Categories from "./Categories";

describe("<Categories/>", () => {
  it("should mount", () => {
    mount(
      <StaticRouter>
        <Categories />
      </StaticRouter>
    );
  });
});
