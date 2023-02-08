import React, { FC } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Counter from "../../components/Counter";

import { IToOrderDeskProps } from "./types";

const ToOrderDesk: FC<IToOrderDeskProps> = ({ data }) => {
  return (
    <div className="desk">
      <div className="image-container">
        <LazyLoadImage src={data.image} effect="blur" className="image" />
      </div>
      <div className="text">{data.title}</div>
      <div className="counter-container">
        <div className="price">{data.price} $</div>
        <Counter />
      </div>
    </div>
  );
};

export default ToOrderDesk;
