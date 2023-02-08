import React from "react";
import { shallow } from "enzyme";

import BackButton from "./BackButton";

describe("<BackButton />", () => {
  it("should mount", () => {
    shallow(<BackButton />);
  });
});
