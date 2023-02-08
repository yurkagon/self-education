import React, { FC } from "react";
import { withRouter } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";

import Counter from "views/restaurant/components/Counter";

import { IDishProps } from "./types";

const Dish: FC<IDishProps> = ({ data, history }) => (
  <div
    className="dish"
    onClick={() =>
      history.push(`${history.location.pathname}/dish/${data._id}`)
    }
  >
    <div className="content">
      <div className="image-container">
        <LazyLoadImage
          src="https://www.flatironsquare.co.uk/content/_mobile/Food_Hero_Image.jpg"
          className="image"
          effect="blur"
        />
      </div>

      <div className="description-container">
        <h4 className="text">{data.name.ua}</h4>
        <div className="description">{data.description}</div>
      </div>
    </div>
    <div className="order">
      <span className="price">{data.price.toFixed(2)} ₴</span>

      <Counter />
    </div>
  </div>
);

export default withRouter(Dish);
