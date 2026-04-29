import React, { FC } from "react";
import { withRouter, RouteComponentProps, useParams } from "react-router-dom";
import Ripples from "react-ripples";

import "./style.scss";

const OrderButton: FC<RouteComponentProps> = ({ history }) => {
  const { restaurant_slug } = useParams<{ restaurant_slug: string }>();
  return (
    <Ripples
      className="order-button"
      onClick={() => history.push(`/r/${restaurant_slug}/to_order`)}
    >
      <div className="cart">
        <div className="icon" />
        <span className="count">1</span>
      </div>

      <span className="price">1200.00 ₴</span>
      <span className="text">До замовлення</span>
    </Ripples>
  );
};

export default withRouter(OrderButton);
