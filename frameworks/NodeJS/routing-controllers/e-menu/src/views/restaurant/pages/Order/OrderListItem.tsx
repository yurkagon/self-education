import React, { FC } from "react";
import { IOrderListItemProps } from "./types";

const OrderListItem: FC<IOrderListItemProps> = ({ data }) => {
  return (
    <div className="table-list">
      <div className="names">
        <p>{data.name}</p>
      </div>
      <div className="info">
        <p>x{data.count}</p>
        <p>{data.price} $</p>
      </div>
    </div>
  );
};

export default OrderListItem;
