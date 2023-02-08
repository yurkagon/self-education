import React from "react";
import { mount } from "enzyme";
import { BrowserRouter } from "react-router-dom";

import Page404 from "./Page404";

describe("Restaurant Page404", () => {
  it("should mount", () => {
    mount(
      <BrowserRouter>
        <Page404 />
      </BrowserRouter>
    );
  });
});
