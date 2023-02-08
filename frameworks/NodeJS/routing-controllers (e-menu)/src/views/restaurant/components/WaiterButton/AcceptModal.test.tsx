import React from "react";
import { shallow } from "enzyme";

import AcceptModal from "./AcceptModal";

describe("<AcceptModal />", () => {
  it("should mount", () => {
    shallow(<AcceptModal isOpen close={() => {}} />);
  });
});
