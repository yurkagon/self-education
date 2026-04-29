import React from "react";
import { mount } from "enzyme";
import { BrowserRouter } from "react-router-dom";

import Menu from "./Menu";

describe("Restaurant page Menu", () => {
  it("should mount", () => {
    mount(
      <BrowserRouter>
        <Menu />
      </BrowserRouter>
    );
  });
});
