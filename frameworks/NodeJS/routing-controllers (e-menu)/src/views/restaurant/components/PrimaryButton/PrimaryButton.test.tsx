import React from "react";
import { shallow } from "enzyme";

import PrimaryButton from "./PrimaryButton";

describe("<PrimaryButton />", () => {
  it("should mount", () => {
    shallow(<PrimaryButton />);
  });
});
