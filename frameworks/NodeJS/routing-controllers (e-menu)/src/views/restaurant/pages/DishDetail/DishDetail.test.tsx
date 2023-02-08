import React from "react";
import { BrowserRouter, withRouter } from "react-router-dom";
import { mount } from "enzyme";

import DishDetailOriginal from "./DishDetail";

describe("Restaurant page DishDetail", () => {
  const DishDetail = withRouter(DishDetailOriginal);

  it("should mount", () => {
    mount(
      <BrowserRouter>
        <DishDetail />
      </BrowserRouter>
    );
  });
});
