import React from "react";
import { shallow } from "enzyme";
import { BrowserRouter } from "react-router-dom";

import Dish from "./Dish";

describe("<Dish/>", () => {
  const mockedDish: IDish = {
    _id: "id",
    description: "description",
    price: 123,
    ownerId: "123",
    restaurantId: "123",
    images: [],
    name: { ua: "test" },
    disabled: false,
  };

  it("should mount", () => {
    shallow(
      <BrowserRouter>
        <Dish data={mockedDish} />
      </BrowserRouter>
    );
  });
});
