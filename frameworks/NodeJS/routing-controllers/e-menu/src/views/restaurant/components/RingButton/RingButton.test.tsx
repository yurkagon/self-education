import React from "react";
import { shallow } from "enzyme";

import RingButton from "./RingButton";

describe("<RingButton />", () => {
  it("should mount", () => {
    shallow(<RingButton />);
  });
});
