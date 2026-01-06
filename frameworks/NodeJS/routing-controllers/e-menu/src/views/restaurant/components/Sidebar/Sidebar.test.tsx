import React from "react";
import { shallow } from "enzyme";
import { BrowserRouter } from "react-router-dom";
import Sidebar from "./Sidebar";

describe("<Sidebar />", () => {
  it("should mount", () => {
    shallow(
      <BrowserRouter>
        <Sidebar />
      </BrowserRouter>
    );
  });
});
