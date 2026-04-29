import React from "react";
import { shallow } from "enzyme";

import ErrorBoundary from "./ErrorBoundary";

describe("<ErrorBoundary />", () => {
  it("should mount", () => {
    shallow(<ErrorBoundary />);
  });
});
