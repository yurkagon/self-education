import React from "react";
import { mount } from "enzyme";

import App from "./index";

describe("Web application", () => {
  it("should mount", () => {
    mount(<App />);
  });
});
