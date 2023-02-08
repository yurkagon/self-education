import React from "react";
import { StaticRouter } from "react-router-dom";
import { mount } from "enzyme";

import AdminApp from "./App";

describe("Admin application", () => {
  it("should mount", () => {
    mount(
      <StaticRouter>
        <AdminApp />
      </StaticRouter>
    );
  });
});
