import React from "react";
import { StaticRouter } from "react-router-dom";
import { mount } from "enzyme";

import RestaurantApp from "./index";

describe("Restaurant application", () => {
  it("should mount", () => {
    mount(
      <StaticRouter>
        <RestaurantApp />
      </StaticRouter>
    );
  });
});
