import React from "react";
import { shallow } from "enzyme";

import LoadingScreen from "./LoadingScreen";

describe("<LoadingScreen />", () => {
  it("should mount", () => {
    shallow(<LoadingScreen />);
  });
});
