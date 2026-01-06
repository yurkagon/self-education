import React, { FC, useState } from "react";

import "./style.scss";
import { ICounterProps } from "./types";

const Counter: FC<ICounterProps> = ({ disableOrderButton }) => {
  const [quantity, setQuantity] = useState(0);

  const quantityAdd = (e: any) => {
    e.stopPropagation();
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
  };

  const quantityRemove = (e: any) => {
    e.stopPropagation();
    const newQuantity = quantity - 1;
    setQuantity(newQuantity);
  };

  return (
    <React.Fragment>
      {quantity < 1 && !disableOrderButton ? (
        <div className="initial-order-button" onClick={quantityAdd}>
          Замовити
        </div>
      ) : (
        <div className="order-counter">
          <div className="counter-button" onClick={quantityRemove}>
            -
          </div>
          <span className="count">{quantity}</span>
          <div className="counter-button" onClick={quantityAdd}>
            +
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default Counter;
