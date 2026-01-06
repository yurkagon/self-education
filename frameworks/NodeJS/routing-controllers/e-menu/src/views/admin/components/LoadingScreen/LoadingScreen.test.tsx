import React from "react";
import { shallow } from "enzyme";

import LoadingScreen from "./LoadingScreen";

describe("Admin <LoadingScreen />", () => {
  it("should mount", () => {
    shallow(<LoadingScreen />);
  });
});
