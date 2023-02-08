import React from "react";
import { shallow } from "enzyme";

import CallWaiterModal from "./CallWaiterModal";

describe("<CallWaiterModal />", () => {
  it("should mount", () => {
    shallow(
      <CallWaiterModal
        isOpen
        onCall={() => {}}
        callType="bill"
        setCallType={() => {}}
        close={() => {}}
      />
    );
  });
});
