import React from "react";
import { mount } from "enzyme";

import ToOrder from "./ToOrder";
import { BrowserRouter } from "react-router-dom";

describe("Restaurant Page500", () => {
  it("should mount", () => {
    mount(
      <BrowserRouter>
        <ToOrder />
      </BrowserRouter>
    );
  });
});
