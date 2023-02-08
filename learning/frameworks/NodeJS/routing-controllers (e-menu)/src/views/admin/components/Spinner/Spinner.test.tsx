import React from "react";
import { shallow } from "enzyme";

import Spinner from "./Spinner";

describe("Admin <Spinner />", () => {
  it("should mount", () => {
    shallow(<Spinner />);
  });
});
