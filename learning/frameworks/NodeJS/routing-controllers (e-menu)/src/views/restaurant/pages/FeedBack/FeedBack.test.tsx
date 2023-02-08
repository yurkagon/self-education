import React from "react";
import { mount } from "enzyme";

import FeedBack from "./FeedBack";
import { BrowserRouter } from "react-router-dom";

describe("Restaurant page FeedBack", () => {
  it("should mount", () => {
    mount(
      <BrowserRouter>
        <FeedBack />
      </BrowserRouter>
    );
  });
});
